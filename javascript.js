const GameBoard = (function() {
    const gameBoard = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
    ];

    function printBoard() {
        for (let x in gameBoard){
            console.log(gameBoard[x]);
        };
    };

    function setCell(x, y, char) {
        if (char !== 'X' && char !== 'O') {
            console.log(`Error: setCell(x, y, char). Char is ${char}`);
            return;
        }
        if (![0, 1, 2].includes(x) || ![0, 1, 2].includes(y)) {
            console.log(`Error: setCell(x, y, char). x or y is out of bounds`);
            return;
        }
        gameBoard[x][y] = char;
        printBoard();
    };


    return {
        gameBoard,
        setCell,
        printBoard
    }
})();


function createPlayer(name) {
    const player = {};
    player.name = name;
    player.won = 0;

    return player;
}

GameBoard.setCell(4, 2, "O");