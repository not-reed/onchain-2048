// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {TwentyFortyEight} from "../src/TwentyFortyEight.sol";

contract Deploy2048 is Script {
    // TwentyFortyEight public twentyFortyEight;
    function run() external {
        vm.startBroadcast();
        new TwentyFortyEight();
        vm.stopBroadcast();
    }
}
