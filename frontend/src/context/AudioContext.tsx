import {
	createContext,
	type PropsWithChildren,
	use,
	useEffect,
	useRef,
	useState,
} from "react";

const AudioContext = createContext<ReturnType<typeof useAudioLogic> | null>(
	null,
);

function useAudioLogic() {
	const audioA = useRef<HTMLAudioElement | null>(null);
	const clickRef = useRef<HTMLAudioElement | null>(null);
	const failRef = useRef<HTMLAudioElement | null>(null);
	const [isMuted, setMuted] = useState(false);
	const [hasStarted, setStarted] = useState(false); // to avoid autoplay block

	useEffect(() => {
		audioA.current = new Audio("/sounds/Cyberpunk_Moonlight_Sonata_v2.mp3");
		audioA.current.loop = true;
		audioA.current.volume = 0.3;
		audioA.current.preload = "auto";

		clickRef.current = new Audio("/sounds/melee_sound.wav");
		clickRef.current.volume = 1;
		clickRef.current.preload = "auto";

		failRef.current = new Audio("/sounds/bzzzt.wav");
		failRef.current.volume = 1;
		failRef.current.preload = "auto";
	}, []);

	const play = () => {
		if (!audioA.current || isMuted) return;
		audioA.current.play().then(() => setStarted(true));
	};

	const pause = () => {
		audioA.current?.pause();
	};

	const click = () => {
		if (!isMuted && clickRef.current) {
			clickRef.current.currentTime = 0;
			clickRef.current.play().catch(() => {});
		}
	};

	const fail = () => {
		if (!isMuted && failRef.current) {
			failRef.current.currentTime = 0;
			failRef.current.play().catch(() => {});
		}
	};

	const mute = () => {
		setMuted(true);
		pause();
	};

	const unmute = () => {
		setMuted(false);
		if (hasStarted) audioA.current?.play();
	};

	return {
		play,
		pause,
		click,
		fail,
		mute,
		unmute,
		isMuted,
		isPlaying: audioA.current?.paused === false,
	};
}

export function AudioProvider({ children }: PropsWithChildren) {
	const audio = useAudioLogic();
	return (
		<AudioContext.Provider value={audio}>{children}</AudioContext.Provider>
	);
}

export function useAudio() {
	const context = use(AudioContext);

	if (context === null)
		throw new Error("useGame must be used within a GameProvider");

	return context;
}
