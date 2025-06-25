import { AudioControls } from "./components/AudioControls";
import { CreateGameButton } from "./components/CreateGameButton";
import { Footer } from "./components/Footer";
import { GameActions } from "./components/GameActions";
import { GameBoard } from "./components/GameBoard";
import { GameStats } from "./components/GameStats";
import { HowToPlay } from "./components/HowToPlay";
import { SelectRoomInput } from "./components/SelectRoomInput";
import {
	ApproveSessionKey,
	RevokeSessionKey,
} from "./components/SessionKeyButtons";

function App() {
	return (
		<div className="flex flex-col min-h-svh items-center justify-center">
			<div className="p-4 max-w-md mx-auto text-center flex flex-col gap-4 grow">
				<h1 className="text-4xl text-teal-400 mb-2 font-bold">Happy 2048</h1>

				<SelectRoomInput />

				<AudioControls />

				<CreateGameButton />

				<GameStats />

				<div className="animate-subtle-ping grid gap-4 ">
					<GameBoard />

					<GameActions />
				</div>

				<div className="flex justify-between">
					<ApproveSessionKey />
					<RevokeSessionKey />
				</div>
			</div>

			<HowToPlay />

			<Footer />
		</div>
	);
}

export default App;
