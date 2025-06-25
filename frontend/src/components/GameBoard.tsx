import { TILE_COLORS } from "../config/colors";
import { useGame } from "../context/GameContext";
import { cn } from "../utils/cn";
import { GameGrid } from "./GameGrid";

export function GameBoard() {
	const { board } = useGame();

	return (
		<GameGrid>
			{board.flat().map((cell, i) => (
				<GameCell key={i.toString()} cell={cell} />
			))}
		</GameGrid>
	);
}

function GameCell({ cell }: { cell: number }) {
	return (
		<div
			className={cn(
				"flex items-center justify-center",
				"text-3xl sm:text-4xl font-bold",
				"shadow-xl",
				"aspect-square w-20 sm:w-24 rounded-lg transition-all duration-100",
				TILE_COLORS[cell] || "bg-zinc-300 text-black",
			)}
		>
			{cell > 0 ? cell : ""}
		</div>
	);
}
