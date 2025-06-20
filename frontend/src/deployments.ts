import ABI from "../../abi/TwentyFortyEight.sol/TwentyFortyEight.json";
import run from "../../contracts/broadcast/Deploy.s.sol/216/run-latest.json";

export const CONTRACT_ADDRESS = run.transactions[0]
	?.contractAddress as `0x${string}`;
export const CONTRACT_ABI = ABI.abi;
