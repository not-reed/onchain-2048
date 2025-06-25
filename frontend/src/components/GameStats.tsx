import { zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { useGame } from "../context/GameContext";

export function GameStats() {
	const { score } = useGame();
	return (
		<div className="flex flex-col items-start text-lg text-zinc-300">
			<div>
				<span className="opacity-50 text-base">Run Score: </span>
				{score}
			</div>
			<div>
				<span className="opacity-50 text-base">Last Move By: </span>

				<LastPlayerAddress />
			</div>
		</div>
	);
}

function LastPlayerAddress() {
	const { lastPlayer: player } = useGame();
	const { address } = useAccount();

	if (player === address) {
		return <span className="text-teal-400 font-bold underline">You!</span>;
	}

	if (player !== zeroAddress) {
		return `${player.slice(0, 6)}...${player.slice(-4)}`;
	}

	return <>{""}</>;
}
