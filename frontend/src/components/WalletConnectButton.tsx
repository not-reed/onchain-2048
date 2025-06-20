import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ChaosButton } from "./Button";

export function WalletConnectButton() {
	const {
		connectors: [connector],
		connect,
	} = useConnect();
	const { disconnect } = useDisconnect();
	const { isDisconnected } = useAccount();

	return (
		<ChaosButton
			onClick={() => (isDisconnected ? connect({ connector }) : disconnect())}
		>
			{isDisconnected ? `Connect` : `Disconnect`}
		</ChaosButton>
	);
}
