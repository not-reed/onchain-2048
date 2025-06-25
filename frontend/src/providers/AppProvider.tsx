import { ProgressProvider } from "@bprogress/react";
import { HappyWalletProvider } from "@happy.tech/react";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { queryClient } from "../config/queryClient";
import { config } from "../config/wagmi";
import { AudioProvider } from "../context/AudioContext";
import { GameProvider } from "../context/GameContext";

export function AppProviders({ children }: PropsWithChildren) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<HappyWalletProvider>
					<ProgressProvider>
						<AudioProvider>
							<GameProvider>{children}</GameProvider>
						</AudioProvider>
					</ProgressProvider>
				</HappyWalletProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
