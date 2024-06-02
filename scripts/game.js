// const createPlayer = require('./player');
// const GameBoard = require('./gameboard');
// const readlineSync = require('readline-sync');

import createPlayer from './player.js';
import GameBoard from './gameboard.js';
import Renderer from './renderer.js';


const Game = (function(){
    const player1 = createPlayer('Player 1');
    const player2 = createPlayer('Player2');
    let firstPlayerTurn = true;  // Keeps track whose turn it is.




    // Receive event from renderer
    function receiveClick(event) {
        const myRow = event.getAttribute("data-row");
        const myCol = event.getAttribute("data-col");
        console.log({myRow, myCol});
        playRound(myRow, myCol);
    }


    function checkIfWon() {
        if (player1.checkWon()) {
            return 1;
        } else if (player2.checkWon()) {
            return 2;
        };
    };

    function playRound(myRow, myCol) {
        const row = parseInt(myRow);
        const col = parseInt(myCol);
        const char = (firstPlayerTurn) ? "X" : "O";
        const nextChar = (firstPlayerTurn) ? "O" : "X";
        Renderer.setSymbol(nextChar);

        // Execute command
        GameBoard.setCell(row, col, char);
        const stateAtRoundEnd = GameBoard.checkGameState();
        
        if (stateAtRoundEnd && firstPlayerTurn) {
            console.log("Player 1 has won this round");
            player1.increaseWins();
            firstPlayerTurn = true;
            Renderer.setGameover(true);
        } else if (stateAtRoundEnd && !firstPlayerTurn) {
            console.log("Player 2 has won this round");
            player2.increaseWins();
            firstPlayerTurn = true;
        } else if (firstPlayerTurn) {
            firstPlayerTurn = false;
        } else {
            firstPlayerTurn = true;
        }
    }


;
    return {
        receiveClick,
    }
})();

export default Game;