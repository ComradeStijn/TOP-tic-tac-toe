const GameBoard = (function() {
    const gameBoard = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
    ];

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
        gameBoard[row][col] = char;
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
        checkGameState
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
    GameBoard.setCell(2, 0, 'O');
    GameBoard.setCell(2, 1, 'O');
    GameBoard.setCell(2, 2, 'O');
    GameBoard.printBoard();
    console.log(GameBoard.checkGameState());

})();