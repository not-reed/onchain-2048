// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TwentyFortyEight {
    enum Direction { Up, Down, Left, Right }

    struct Game {
        uint16[4][4] board;
        uint256 score;
        bool gameOver;
        address lastPlayer;
        uint256 lastMoveBlock;
    }

    mapping(bytes32 => Game) public games;

    function getBoard(bytes32 gameId) external view returns (uint16[4][4] memory) {
        return games[gameId].board;
    }

    event MoveMade(bytes32 indexed gameId, address indexed player, Direction dir, uint16[4][4] board, uint256 score);
    event GameReset(bytes32 indexed gameId);

    function joinGame(string memory name) external {
        bytes32 gameId = keccak256(abi.encodePacked(name));
        Game storage game = games[gameId];

        if (_isEmpty(game.board)) {
            _spawnTile(game.board, game.score);
            _spawnTile(game.board, game.score);
        }
    }

    function move(string memory name, Direction dir) external {
        bytes32 gameId = keccak256(abi.encodePacked(name));
        Game storage game = games[gameId];
        require(!game.gameOver, "Game over");

        (uint16[4][4] memory updatedBoard, uint256 points, bool moved) = applyMove(game.board, dir);
        require(moved, "No tiles moved");

        game.board = updatedBoard;
        game.score += points;
        game.lastPlayer = msg.sender;
        game.lastMoveBlock = block.number;

        _spawnTile(game.board, game.score);

        if (!_canMove(game.board)) {
            game.gameOver = true;
            emit GameReset(gameId);
            _resetGame(game);
        }

        emit MoveMade(gameId, msg.sender, dir, game.board, game.score);
    }

    // --- Internal Logic ---

    function _resetGame(Game storage game) internal {
        delete game.board;
        game.score = 0;
        game.gameOver = false;
        _spawnTile(game.board, game.score);
        _spawnTile(game.board, game.score);
    }

    function _isEmpty(uint16[4][4] memory board) internal pure returns (bool) {
        for (uint8 y = 0; y < 4; y++) {
            for (uint8 x = 0; x < 4; x++) {
                if (board[y][x] != 0) return false;
            }
        }
        return true;
    }

    function _spawnTile(uint16[4][4] storage board, uint256 seed) internal {
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, blockhash(block.number - 1), seed)));

        for (uint8 i = 0; i < 16; i++) {
            uint8 index = uint8((rand + i) % 16);
            uint8 x = index % 4;
            uint8 y = index / 4;
            if (board[y][x] == 0) {
                board[y][x] = (rand % 10 == 0) ? 4 : 2;
                return;
            }
        }
    }

    function applyMove(uint16[4][4] memory board, Direction dir) public pure returns (
        uint16[4][4] memory newBoard, uint256 points, bool moved
    ) {
        newBoard = board;
        points = 0;
        moved = false;

        for (uint8 i = 0; i < 4; i++) {
            uint16[4] memory line;
            for (uint8 j = 0; j < 4; j++) {
                uint16 val;
                if (dir == Direction.Left) val = newBoard[i][j];
                if (dir == Direction.Right) val = newBoard[i][3 - j];
                if (dir == Direction.Up) val = newBoard[j][i];
                if (dir == Direction.Down) val = newBoard[3 - j][i];
                line[j] = val;
            }

            (uint16[4] memory compressed, uint256 lineScore, bool lineMoved) = _compressLine(line);
            if (lineMoved) moved = true;
            points += lineScore;

            for (uint8 j = 0; j < 4; j++) {
                if (dir == Direction.Left) newBoard[i][j] = compressed[j];
                if (dir == Direction.Right) newBoard[i][3 - j] = compressed[j];
                if (dir == Direction.Up) newBoard[j][i] = compressed[j];
                if (dir == Direction.Down) newBoard[3 - j][i] = compressed[j];
            }
        }
    }

    function _compressLine(uint16[4] memory line) internal pure returns (
        uint16[4] memory result, uint256 score, bool moved
    ) {
        uint16[4] memory filtered;
        uint8 idx = 0;

        // Remove zeros
        for (uint8 i = 0; i < 4; i++) {
            if (line[i] != 0) {
                filtered[idx++] = line[i];
            }
        }

        // Merge
        for (uint8 i = 0; i < 3; i++) {
            if (filtered[i] != 0 && filtered[i] == filtered[i + 1]) {
                filtered[i] *= 2;
                score += filtered[i];
                filtered[i + 1] = 0;
                i++; // Skip next
            }
        }

        // Compress again
        idx = 0;
        for (uint8 i = 0; i < 4; i++) {
            if (filtered[i] != 0) {
                result[idx++] = filtered[i];
            }
        }

        // Detect movement
        for (uint8 i = 0; i < 4; i++) {
            if (result[i] != line[i]) {
                moved = true;
                break;
            }
        }
    }

    function _canMove(uint16[4][4] memory b) internal pure returns (bool) {
        for (uint8 y = 0; y < 4; y++) {
            for (uint8 x = 0; x < 4; x++) {
                if (b[y][x] == 0) return true;
                if (x < 3 && b[y][x] == b[y][x + 1]) return true;
                if (y < 3 && b[y][x] == b[y + 1][x]) return true;
            }
        }
        return false;
    }
}
