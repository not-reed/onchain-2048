import { MoveDirection, useGame } from "../context/GameContext";
import { GameGrid } from "./GameGrid";
import { GameButton } from "./primitives/Button";

export function GameActions() {
	const { move } = useGame();

	return (
		<GameGrid>
			<GameButton onClick={() => move(MoveDirection.UP)}>↑</GameButton>
			<GameButton onClick={() => move(MoveDirection.LEFT)}>←</GameButton>
			<GameButton onClick={() => move(MoveDirection.RIGHT)}>→</GameButton>
			<GameButton onClick={() => move(MoveDirection.DOWN)}>↓</GameButton>
		</GameGrid>
	);
}
