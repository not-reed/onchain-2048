import {
	createHappyChainWagmiConfig,
	happyChainSepolia,
} from "@happy.tech/core";

export const config = createHappyChainWagmiConfig(happyChainSepolia);

// import { connect } from "@wagmi/core";
// const result = connect(config, { connector: config.connectors[0] });
