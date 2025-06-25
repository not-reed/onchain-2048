import { useProgress } from "@bprogress/react";
import { requestSessionKey, revokeSessionKey } from "@happy.tech/core";
import { useCallback } from "react";
import { toast } from "sonner";
import { CONTRACT_ADDRESS } from "../config/deployments";

export function useSessionKeys() {
	const { start, stop } = useProgress();

	const approve = useCallback(async () => {
		try {
			start();
			await requestSessionKey(CONTRACT_ADDRESS);
			toast.success("Session Keys are now active! Make your move");
			console.log("Session key requested successfully");
		} catch (err) {
			toast.error("Failed to request session key. Please try again.");
			console.error("Failed to request session key", err);
		} finally {
			stop();
		}
	}, []);

	const revoke = useCallback(async () => {
		try {
			start();
			await revokeSessionKey(CONTRACT_ADDRESS);
			toast.success("Session Keys are now disabled! Make your move");
			console.log("Session key requested successfully");
		} catch (err) {
			toast.error("Failed to revoke session key. Please try again.");
			console.error("Failed to revoke session key", err);
		} finally {
			stop();
		}
	}, []);

	return { approve, revoke };
}
