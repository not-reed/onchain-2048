import { keccak256, toHex } from "viem/utils";

export function hashGameId(name: string) {
	return keccak256(toHex(name));
}
