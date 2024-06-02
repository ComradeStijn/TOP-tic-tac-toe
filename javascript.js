// const Game = require('./scripts/game.js');
import Game from './scripts/game.js';

// Game.gameLoop();

document.addEventListener("DOMContentLoaded",() => {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell) => {
        cell.addEventListener("mouseenter", () => {
            cell.innerHTML = "X";
        });
    
        cell.addEventListener("mouseleave", () => {
            cell.innerHTML = "";
        })
    })   
})
   