import { useProgress } from "@bprogress/react";
import { useQueryClient } from "@tanstack/react-query";
import {
	createContext,
	type PropsWithChildren,
	use,
	useCallback,
	useEffect,
} from "react";
import { toast } from "sonner";
import { zeroAddress } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/deployments";
import { usePersistedState } from "../hooks/usePersistedState";
import { hashGameId } from "../utils/hashGameId";
import { useAudio } from "./AudioContext";

export type GameMatrix = typeof EMPTY_BOARD;
export enum MoveDirection {
	UP = 0,
	DOWN = 1,
	LEFT = 2,
	RIGHT = 3,
}

const GameContext = createContext<ReturnType<typeof useGameLogic> | null>(null);

// type number so 'as const' doesn't pickup literal '0'
const zero: number = 0;
// Empty Board State (fallback while request is pending)
const EMPTY_BOARD = [
	[zero, zero, zero, zero],
	[zero, zero, zero, zero],
	[zero, zero, zero, zero],
	[zero, zero, zero, zero],
] as const;

// Default Game State (fallback while request is pending)
const DEFAULT_GAME = [0n, false, zeroAddress, 0n] as const;

enum MovementKey {
	UP = "ArrowUp",
	DOWN = "ArrowDown",
	LEFT = "ArrowLeft",
	RIGHT = "ArrowRight",
}
// make string[] for easy includes check
const Keys: string[] = [
	MovementKey.UP,
	MovementKey.DOWN,
	MovementKey.LEFT,
	MovementKey.RIGHT,
];

function useGameLogic() {
	const [room, setRoom] = usePersistedState("game-room", "happychain");
	const gameId = hashGameId(room);
	const { click, fail } = useAudio();
	const queryClient = useQueryClient();
	const { start, stop } = useProgress();
	const { writeContractAsync: joinGameWrite } = useWriteContract();
	const { writeContractAsync: moveWrite } = useWriteContract();
	const { data: game = DEFAULT_GAME } = useReadContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		functionName: "games",
		args: [gameId],
		query: { refetchInterval: 2000 },
	});
	const { data: board = EMPTY_BOARD, queryKey: boardQueryKey } =
		useReadContract({
			address: CONTRACT_ADDRESS,
			abi: CONTRACT_ABI,
			functionName: "getBoard",
			args: [gameId],
			query: { refetchInterval: 2000 },
		});

	const exists = Boolean(board?.flat().some((x) => x > 0));

	async function create() {
		try {
			start();
			console.log("Joining game:", room);
			const boop = await joinGameWrite({
				address: CONTRACT_ADDRESS,
				abi: CONTRACT_ABI,
				functionName: "joinGame",
				args: [room],
			});
			console.log({ boop });
		} catch (error) {
			toast.error("Failed to create a game. Please try again.");
			console.error("Error joining game:", error);
		} finally {
			stop();
		}
	}

	async function move(direction: MoveDirection) {
		if (!exists) {
			toast.error("Game does not exist. Please create a game first.");
			return;
		}
		try {
			console.log("MOVING:", room, direction);
			start();
			const boop = await moveWrite({
				address: CONTRACT_ADDRESS,
				abi: CONTRACT_ABI,
				functionName: "move",
				args: [room, direction],
			});
			click();
			queryClient.invalidateQueries({ queryKey: boardQueryKey });
			console.log({ boop });
		} catch (error) {
			fail();
			toast.error("Failed to make a move. Please try again.");
			console.error("Error joining game:", error);
		} finally {
			stop();
		}
	}

	const [score, _gameOver, lastPlayer, _lastBlock] = game;

	return {
		create,
		setRoom,
		move,
		room,
		game,
		score,
		lastPlayer,
		exists,
		board,
	};
}

export function GameProvider({ children }: PropsWithChildren) {
	const { isConnected } = useAccount();
	const game = useGameLogic();
	const { move } = game;

	// Arrow key support
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!Keys.includes(e.key)) return;
			if (!isConnected) return;

			e.preventDefault();

			switch (e.key) {
				case MovementKey.UP:
					move(MoveDirection.UP);
					break;
				case MovementKey.DOWN:
					move(MoveDirection.DOWN);
					break;
				case MovementKey.LEFT:
					move(MoveDirection.LEFT);
					break;
				case MovementKey.RIGHT:
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

	return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

export function useGame() {
	const context = use(GameContext);

	if (context === null)
		throw new Error("useGame must be used within a GameProvider");

	return context;
}
