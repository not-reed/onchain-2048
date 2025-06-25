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

const { PRIVATE_KEY, GAME_ROOM = "happychain" } = process.env;
assertPrivateKey(PRIVATE_KEY);

const config = {
	account: privateKeyToAccount(PRIVATE_KEY, { nonceManager }),
	chain: happyChainSepolia,
	transport: http(),
} as const;

const walletClient = createWalletClient(config);
const publicClient = createPublicClient(config);

(async () => {
	console.log("🚀 Bot starting. Will make random move once every block...");
	publicClient.watchBlockNumber({
		onBlockNumber: async () => {
			try {
				await makeRandomMove();
			} catch {}
		},
	});
})();

async function makeRandomMove() {
	const { index, label } = getNextMove();

	let hash: `0x${string}` | undefined;

	try {
		console.log(`🎮 Moving ${label}...`);
		hash = await walletClient.writeContract({
			address: run.transactions[0]?.contractAddress,
			abi: ABI.abi,
			functionName: "move",
			args: [GAME_ROOM, index],
		});
		await publicClient.waitForTransactionReceipt({ hash });
		console.log(
			`🎮 Moved: ${label} at ${new Date().toLocaleTimeString()}`,
			hash,
		);
		// biome-ignore lint/suspicious/noExplicitAny: its fine...
	} catch (err: any) {
		console.error("❌ Move failed:", err?.shortMessage || err?.message, hash);
	}
}

function getNextMove() {
	const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
	const index = Math.floor(Math.random() * 4);
	const label = directions[index];
	return { index, label };
}
function assertPrivateKey(
	key: string | undefined,
): asserts key is `0x${string}` {
	if (!key) throw new Error("PRIVATE_KEY is not set in environment variables");

	if (!/^(0x)?[0-9a-fA-F]{64}$/.test(key)) {
		throw new Error(
			"PRIVATE_KEY is not a valid 32-byte hex string (64 hex characters).",
		);
	}
}
