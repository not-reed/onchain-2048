// important hotfix
import "./wat";

import { happyChainSepolia } from "@happy.tech/core";
import {
	createPublicClient,
	createWalletClient,
	http,
	nonceManager,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import ABI from "./abi/TwentyFortyEight.sol/TwentyFortyEight.json";
import run from "./contracts/broadcast/Deploy.s.sol/216/run-latest.json";

const walletClient = createWalletClient({
	account: privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`, {
		nonceManager,
	}),
	chain: happyChainSepolia,
	transport: http(),
});

const publicClient = createPublicClient({
	chain: happyChainSepolia,
	transport: http(),
});
const directions = ["UP", "DOWN", "LEFT", "RIGHT"];

async function makeRandomMove() {
	const dirIndex = Math.floor(Math.random() * 4);
	try {
		console.log(`🎮 Moving  ${directions[dirIndex]}...`);
		const hash = await walletClient.writeContract({
			address: run.transactions[0]?.contractAddress,
			abi: ABI.abi,
			functionName: "move",
			args: ["happychain", dirIndex],
		});
		await publicClient.waitForTransactionReceipt({ hash });
		console.log(
			`🎮 Moved: ${directions[dirIndex]} at ${new Date().toLocaleTimeString()}`,
		);
	} catch (err: any) {
		console.error("❌ Move failed:", err?.shortMessage || err?.message);
	}
}

async function main() {
	console.log("🚀 Bot starting...");

	setInterval(makeRandomMove, 5000);
}

main();
