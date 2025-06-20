import { useProgress } from "@bprogress/react";
import { requestSessionKey } from "@happy.tech/core";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { keccak256, toHex } from "viem/utils";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../deployments";
import { Button, ChaosButton, GameButton } from "./Button";
import { WalletConnectButton } from "./WalletConnectButton";

function hashGameId(name: string) {
	return keccak256(toHex(name));
}

enum MoveDirection {
	UP = 0,
	DOWN = 1,
	LEFT = 2,
	RIGHT = 3,
}

const TILE_COLORS: Record<number, string> = {
	0: "bg-slate-600 text-transparent",
	2: "bg-gray-100 text-gray-800",
	4: "bg-yellow-100 text-amber-900",
	8: "bg-orange-300 text-gray-700",
	16: "bg-orange-400 text-white",
	32: "bg-orange-500 text-white",
	64: "bg-orange-600 text-white",
	128: "bg-yellow-300 text-gray-600",
	256: "bg-yellow-400 text-white",
	512: "bg-yellow-500 text-white",
	1024: "bg-green-400 text-white",
	2048: "bg-green-600 text-white",
};

function useGameActions(name: string) {
	const gameId = hashGameId(name);
	const queryClient = useQueryClient();
	const { start, stop } = useProgress();
	const { writeContractAsync: joinGameWrite } = useWriteContract();
	const { writeContractAsync: moveWrite } = useWriteContract();
	const { data: game } = useReadContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		functionName: "games",
		args: [gameId],
		query: { refetchInterval: 2000 },
	});
	const { data: board, queryKey: boardQueryKey } = useReadContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		functionName: "getBoard",
		args: [gameId],
		query: { refetchInterval: 2000 },
	});

	async function join() {
		try {
			start();
			console.log("Joining game:", name);
			const fin = await joinGameWrite({
				address: CONTRACT_ADDRESS,
				abi: CONTRACT_ABI,
				functionName: "joinGame",
				args: [name],
			});
			console.log({ fin });
		} catch (error) {
			toast.error("Failed to create a game. Please try again.");
			console.error("Error joining game:", error);
		} finally {
			stop();
		}
	}

	async function move(direction: MoveDirection) {
		try {
			console.log("MOVING:", name, direction);
			start();
			const fin = await moveWrite({
				address: CONTRACT_ADDRESS,
				abi: CONTRACT_ABI,
				functionName: "move",
				args: [name, direction],
			});
			queryClient.invalidateQueries({ queryKey: boardQueryKey });
			console.log({ fin });
		} catch (error) {
			toast.error("Failed to make a move. Please try again.");
			console.error("Error joining game:", error);
		} finally {
			stop();
		}
	}

	const [score, _gameOver, lastPlayer, _lastBlock] = (game || [
		0n,
		false,
		"",
		0n,
	]) as [bigint, boolean, `0x${string}`, bigint];
	return {
		join,
		move,
		game,
		score,
		lastPlayer,
		board,
	};
}
export function TwentyFortyEight() {
	const [name, setName] = useState("happychain");
	const { isConnected, status, address } = useAccount();

	const { join, move, score, lastPlayer, board: _board } = useGameActions(name);

	// Arrow key support
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case "ArrowUp":
					move(MoveDirection.UP);
					break;
				case "ArrowDown":
					move(MoveDirection.DOWN);
					break;
				case "ArrowLeft":
					move(MoveDirection.LEFT);
					break;
				case "ArrowRight":
					move(MoveDirection.RIGHT);
					break;
			}
		},
		[move],
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	const exists = Boolean((_board as number[][])?.flat().some((x) => x > 0));

	const board: number[][] = exists
		? (_board as number[][])
		: Array(4).fill([0, 0, 0, 0]);

	return (
		<div className="p-4 max-w-md mx-auto text-center flex flex-col gap-4 grow">
			<h1 className="text-4xl text-teal-400 mb-2 font-bold">Chaos 2048</h1>
			<label className="flex bg-slate-600 pl-2 rounded-lg overflow-hidden gap-2 items-center justify-center">
				<div className="flex text-gray-300/50 text-sm">Game Room:</div>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="py-2 grow font-bold bg-slate-500 px-2"
					placeholder="game name"
				/>
			</label>
			<div className="flex gap-4 items-center justify-center">
				{!exists && <Button onClick={() => join?.()}>Create Game</Button>}
			</div>
			<div className="flex flex-col items-start text-lg text-zinc-300">
				<div>
					<span className="opacity-50 text-base">Run Score: </span>
					{score}
				</div>
				<div>
					<span className="opacity-50 text-base">Last Move By: </span>

					{lastPlayer === address ? (
						<span className="text-teal-400 font-bold underline">You!</span>
					) : (
						`${lastPlayer.slice(0, 6)}...${lastPlayer.slice(-4)}` || "N/A"
					)}
				</div>
			</div>
			{!isConnected && (
				<div className="fixed top-0 left-0 w-full h-full bg-slate-600/50 backdrop-blur-xs rounded-lg flex items-center justify-center">
					{(() => {
						switch (status) {
							case "connecting":
								return <ChaosButton disabled>Connecting...</ChaosButton>;
							case "reconnecting":
								return <span className="text-gray-300">Reconnecting...</span>;
							case "disconnected":
								return <WalletConnectButton />;
						}
					})()}
				</div>
			)}
			<div className="grid grid-cols-4 gap-2">
				<RenderBoard board={board} />
			</div>
			<div className="grid grid-cols-4 justify-center gap-2">
				<GameButton onClick={() => move?.(MoveDirection.UP)}>↑</GameButton>
				<GameButton onClick={() => move?.(MoveDirection.LEFT)}>←</GameButton>
				<GameButton onClick={() => move?.(MoveDirection.RIGHT)}>→</GameButton>
				<GameButton onClick={() => move?.(MoveDirection.DOWN)}>↓</GameButton>
			</div>
			<AutoApproveButton />
		</div>
	);
}

function RenderBoard({ board }: { board: number[][] }) {
	return (
		<>
			{board.flat().map((cell, i) => (
				<div
					key={i.toString()}
					className={clsx(
						"aspect-square w-20 sm:w-24 rounded-lg flex items-center justify-center text-3xl sm:text-4xl font-bold transition-all duration-100",
						TILE_COLORS[cell] || "bg-zinc-300 text-black",
					)}
				>
					{cell > 0 ? cell : ""}
				</div>
			))}
		</>
	);
}

function AutoApproveButton() {
	const { isConnected } = useAccount();
	const { start, stop } = useProgress();
	return (
		<Button
			onClick={async () => {
				try {
					start();
					await requestSessionKey(CONTRACT_ADDRESS);
					toast.success("Session Keys are now active! Make your move");
					console.log("Session key requested successfully");
				} catch (err) {
					toast.error("Failed to request session key. Please try again.");
					console.error("Failed to request session key", err);
				} finally {
					stop();
				}
			}}
			disabled={!isConnected}
		>
			Enable Auto-Approve Transactions
		</Button>
	);
}
