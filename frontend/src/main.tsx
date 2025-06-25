import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { ConnectOverlay } from "./components/ConnectOverlay.tsx";
import { AppProviders } from "./providers/AppProvider.tsx";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
	<StrictMode>
		<AppProviders>
			<App />
			<Toaster theme="dark" richColors={true} />
			<ConnectOverlay />
		</AppProviders>
	</StrictMode>,
);
