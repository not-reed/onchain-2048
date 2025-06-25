import { useAccount } from "wagmi";
import { useSessionKeys } from "../hooks/useSessionKeys";
import { Button } from "./primitives/Button";

export function ApproveSessionKey() {
	const { isConnected } = useAccount();
	const { approve } = useSessionKeys();

	return (
		<Button onClick={approve} disabled={!isConnected}>
			Enable Session Key
		</Button>
	);
}

export function RevokeSessionKey() {
	const { isConnected } = useAccount();
	const { revoke } = useSessionKeys();

	return (
		<Button onClick={revoke} disabled={!isConnected} variant={"orange"}>
			Disable Session Key
		</Button>
	);
}
