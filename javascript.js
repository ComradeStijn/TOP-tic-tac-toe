const GameBoard = (function() {
    const gameBoard = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
    ];

    const printBoard = () => {
        for (let x in gameBoard){
            console.log(gameBoard[x]);
        };
    };

    const setCell = function(x, y, char) {
        if (char !== 'X' || char !== 'O') {
            console.log('Error: setCell(x, y, char). Char is not "X" or "O"');
            return;
        }
        gameBoard[x][y] = char;
        printBoard();
    };

    return {
        gameBoard,
        setCell,
    }
})();


function createPlayer(name) {
    const player = {};
    player.name = name;
    player.won = 0;

    return player;
}

