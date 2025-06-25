import type { PropsWithChildren } from "react";
import { useAudio } from "../context/AudioContext";
import { cn } from "../utils/cn";

export function AudioControls() {
	const { play, pause, mute, unmute, isMuted } = useAudio();

	return (
		<div className="sm:fixed top-4 left-4 z-1">
			<div className="flex sm:flex-col justify-center gap-4">
				{!isMuted ? (
					<AudioButton onClick={() => mute()}>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
						/>
					</AudioButton>
				) : (
					<AudioButton onClick={() => unmute()}>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
						/>
					</AudioButton>
				)}

				<AudioButton onClick={() => play()}>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
					/>
				</AudioButton>

				<AudioButton onClick={() => pause()}>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 5.25v13.5m-7.5-13.5v13.5"
					/>
				</AudioButton>
			</div>
		</div>
	);
}

function AudioButton({
	onClick,
	children,
}: PropsWithChildren<{ onClick: () => void }>) {
	return (
		<button type="button" onClick={onClick}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				role="graphics-symbol"
				className={cn(
					"size-12 bg-cyan-500 hover:bg-cyan-600 hover:scale-105 cursor-pointer transition p-2 rounded-full",
				)}
			>
				{children}
			</svg>
		</button>
	);
}
