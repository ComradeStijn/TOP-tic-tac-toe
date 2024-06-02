const GameBoard = (function() {
    let gameBoard = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
    ];

    function resetBoard() {
        gameBoard = [
            ['.', '.', '.'],
            ['.', '.', '.'],
            ['.', '.', '.'],
        ];
    };

    function printBoard() {
        for (let row in gameBoard){
            console.log(gameBoard[row]);
        };
    };

    function setCell(row, col, char) {
        if (char !== 'X' && char !== 'O') {
            console.log(`Error: setCell(row, col, char). Char is ${char}`);
            return;
        }
        if (![0, 1, 2].includes(row) || ![0, 1, 2].includes(col)) {
            console.log(`Error: setCell(row, col, char). Row or col is out of bounds`);
            return;
        }
        if (gameBoard[row][col] === '.') {
            gameBoard[row][col] = char;
            return true;
        } else {
            console.log(`Error: cell already contains a value`);
            return;
        }
    };

    function checkGameState() {

        // Horizontal
        for (let row of gameBoard) {
            const result = checkWin(row);
            if (result) {
                return row[0];
            }
        }

        // Vertical
        for (let col = 0; col < 3; col++) {
            const ColToCheck = gameBoard.map(row => row[col]);
            const result = checkWin(ColToCheck);
            if (result) {
                return ColToCheck[0];
            }
        }

        // Descending Diagonal
        const descResult = (function() {
            const ColToCheck = [];
            for (let i = 0; i < 3; i++) {
                ColToCheck.push(gameBoard[i][i])
            }
            return checkWin(ColToCheck);
        })();
        if (descResult) {
            return gameBoard[0][0];
        }

        // Ascending diagonal
        const ascResult = (function() {
            const ColToCheck = [];
            for (let i = 0; i < 3; i++) {
                ColToCheck.push(gameBoard[i][2 - i]);
            }
            return checkWin(ColToCheck);
        })();
        if (ascResult) {
            return gameBoard[0][2];
        }


        return false;
    }

    function checkWin(row) {
        return row.every(value => value === "O") || 
                row.every(value => value === "X");
    }



    return {
        gameBoard,
        setCell,
        printBoard,
        checkGameState,
        resetBoard,
    }
})();

export default GameBoard;
