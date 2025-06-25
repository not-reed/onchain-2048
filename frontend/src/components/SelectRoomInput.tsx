import { useGame } from "../context/GameContext";
import { cn } from "../utils/cn";

export function SelectRoomInput() {
	const { room, setRoom } = useGame();

	return (
		<label
			className={cn(
				"flex gap-2 items-center justify-center",
				"bg-slate-600 pl-2 rounded-lg overflow-hidden",
			)}
		>
			<div className="flex text-gray-300/50 text-sm">Game Room:</div>
			<input
				value={room}
				onChange={(e) => setRoom(e.target.value)}
				className="py-2 grow font-bold bg-slate-500 px-2"
				placeholder="game name"
			/>
		</label>
	);
}
