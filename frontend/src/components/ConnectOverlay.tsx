import { ConnectButton } from "@happy.tech/react";
import { useAccount } from "wagmi";
import { useAudio } from "../context/AudioContext";
import { cn } from "../utils/cn";

export function ConnectOverlay() {
	const { play } = useAudio();
	const { isConnected } = useAccount();
	if (isConnected) return null;

	return (
		<div
			className={cn(
				"fixed inset-0 size-full",
				"bg-slate-600/50 backdrop-blur-xs rounded-lg",
				"flex items-center justify-center",
			)}
		>
			<button type="button" onClick={play}>
				<ConnectButton />
			</button>
		</div>
	);
}
