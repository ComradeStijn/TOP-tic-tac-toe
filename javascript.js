const readlineSync = require('readline-sync');

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


function createPlayer(name) {
    let wins = 0;

    function getWins() {
        return wins;
    }
    
    function increaseWins() {
        wins++;
    }

    function resetWins() {
        wins = 0
    }

    function checkWon() {
        return (wins === 3);
    }

    return {name, getWins, increaseWins, resetWins, checkWon};
}

const Game = (function(){
    const player1 = createPlayer('Stijn');
    const player2 = createPlayer('Eva');
    let firstPlayerTurn = true;  // Keeps track whose turn it is.

    // Gameloop
    while (true) {
        const result = checkIfWon();
        if (result === 1) {
            console.log("Player 1 has won the match");
            break;
        } else if (result === 2) {
            console.log("Player 2 has won the match");
            break;
        } else {
            console.log("Next player's turn");
            playRound();
        }


    }

    function checkIfWon() {
        if (player1.checkWon()) {
            return 1;
        } else if (player2.checkWon()) {
            return 2;
        };
    };

    function playRound() {
        let row = "";
        let col = "";
        let char = "";

        GameBoard.printBoard();

        // Get user input
        if (firstPlayerTurn) {
            const prompt = promptForInput(firstPlayerTurn);
            row = parseInt(prompt.myRow) - 1;
            col = parseInt(prompt.myCol) - 1;
            char = "X";
        } else {
            const prompt = promptForInput(firstPlayerTurn);
            row = parseInt(prompt.myRow) - 1;
            col = parseInt(prompt.myCol) - 1;
            char = "O";
        }

        // Execute command
        GameBoard.setCell(row, col, char);
        const stateAtRoundEnd = GameBoard.checkGameState();
        
        if (stateAtRoundEnd && firstPlayerTurn) {
            console.log("Player 1 has won this round");
            player1.increaseWins();
            firstPlayerTurn = true;
            GameBoard.resetBoard();
        } else if (stateAtRoundEnd && !firstPlayerTurn) {
            console.log("Player 2 has won this round");
            player2.increaseWins();
            firstPlayerTurn = true;
            GameBoard.resetBoard();
        } else if (firstPlayerTurn) {
            firstPlayerTurn = false;
        } else {
            firstPlayerTurn = true;
        }
    }

    // Sets row and col
    function promptForInput(firstPlayerTurn) {
        const playerNumber = firstPlayerTurn ? 1 : 2;
        let myRow = readlineSync.question(`Player ${playerNumber}. Row: `);
        let myCol = readlineSync.question(`Player ${playerNumber}. Col: `);
        return {myRow, myCol};
    }
;
    return {
        checkIfWon,
        playRound,
    }
})();



