// uncomment to dynamically get latest json. nice for contract development
// but doesn't play nice with viem/wagmi
// import ABI from "../../../abi/TwentyFortyEight.sol/TwentyFortyEight.json";

import run from "../../../contracts/broadcast/Deploy.s.sol/216/run-latest.json";

export const CONTRACT_ADDRESS = run.transactions[0]
	?.contractAddress as `0x${string}`;

export const CONTRACT_ABI = [
	{
		type: "function",
		name: "applyMove",
		inputs: [
			{
				name: "board",
				type: "uint16[4][4]",
				internalType: "uint16[4][4]",
			},
			{
				name: "dir",
				type: "uint8",
				internalType: "enum TwentyFortyEight.Direction",
			},
		],
		outputs: [
			{
				name: "newBoard",
				type: "uint16[4][4]",
				internalType: "uint16[4][4]",
			},
			{
				name: "points",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "moved",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "pure",
	},
	{
		type: "function",
		name: "games",
		inputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32",
			},
		],
		outputs: [
			{
				name: "score",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "gameOver",
				type: "bool",
				internalType: "bool",
			},
			{
				name: "lastPlayer",
				type: "address",
				internalType: "address",
			},
			{
				name: "lastMoveBlock",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getBoard",
		inputs: [
			{
				name: "gameId",
				type: "bytes32",
				internalType: "bytes32",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint16[4][4]",
				internalType: "uint16[4][4]",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "joinGame",
		inputs: [
			{
				name: "name",
				type: "string",
				internalType: "string",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "move",
		inputs: [
			{
				name: "name",
				type: "string",
				internalType: "string",
			},
			{
				name: "dir",
				type: "uint8",
				internalType: "enum TwentyFortyEight.Direction",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		name: "GameReset",
		inputs: [
			{
				name: "gameId",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "MoveMade",
		inputs: [
			{
				name: "gameId",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32",
			},
			{
				name: "player",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "dir",
				type: "uint8",
				indexed: false,
				internalType: "enum TwentyFortyEight.Direction",
			},
			{
				name: "board",
				type: "uint16[4][4]",
				indexed: false,
				internalType: "uint16[4][4]",
			},
			{
				name: "score",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
] as const;
