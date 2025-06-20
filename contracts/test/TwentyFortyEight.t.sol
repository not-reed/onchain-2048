// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TwentyFortyEight} from "../src/TwentyFortyEight.sol";

contract TwentyFortyEightTest is Test {
    TwentyFortyEight public twentyFortyEight;

    function setUp() public {
        twentyFortyEight = new TwentyFortyEight();
    }
}
