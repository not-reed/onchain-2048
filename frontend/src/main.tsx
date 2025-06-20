import "./index.css";
import { ProgressProvider } from "@bprogress/react";
import { HappyWalletProvider } from "@happy.tech/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { WagmiProvider } from "wagmi";
import App from "./App.tsx";
import { queryClient } from "./query.ts";
import { config } from "./wagmi.ts";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");
createRoot(root).render(
	<StrictMode>
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<HappyWalletProvider>
					<ProgressProvider>
						<Toaster theme="dark" richColors={true} />
						<App />
					</ProgressProvider>
				</HappyWalletProvider>
			</QueryClientProvider>
		</WagmiProvider>
	</StrictMode>,
);
