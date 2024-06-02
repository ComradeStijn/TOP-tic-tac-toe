const createPlayer = require('./player');
const GameBoard = require('./gameboard');
const readlineSync = require('readline-sync');


const Game = (function(){
    const player1 = createPlayer('Stijn');
    const player2 = createPlayer('Eva');
    let firstPlayerTurn = true;  // Keeps track whose turn it is.

    // Gameloop in console
    function gameLoop() 
        {while (true) {
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
        gameLoop
    }
})();

module.exports = Game;