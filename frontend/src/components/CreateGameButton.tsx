import { useGame } from "../context/GameContext";
import { Button } from "./primitives/Button";

export function CreateGameButton() {
	const { exists, create, room } = useGame();

	return (
		<div className="flex gap-4 items-center justify-center">
			{!exists && room.trim() && (
				<Button variant={"green"} onClick={() => create()}>
					Create Game {room}
				</Button>
			)}
		</div>
	);
}
