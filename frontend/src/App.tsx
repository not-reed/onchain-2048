import { TwentyFortyEight } from "./components/TwentyFortyEight";

function App() {
	return (
		<div className="flex flex-col min-h-svh items-center justify-center">
			{/* Doesn't current work the way i want */}
			{/* <ConnectButton /> */}

			<TwentyFortyEight />

			<div className="text-sm text-center text-slate-400 p-4">
				An onchain experiment by{" "}
				<a
					className="text-teal-400 hover:text-teal-600 transition font-semibold"
					href="https://x.com/0x_reed"
				>
					@0x_reed
				</a>
				<br />
				Build on{" "}
				<a
					className="text-teal-400 hover:text-teal-600 transition font-semibold"
					href="https://x.com/HappyChainDevs"
				>
					@HappyChainDevs
				</a>
			</div>
		</div>
	);
}

export default App;
