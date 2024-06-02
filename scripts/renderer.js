import Game from './game.js';
// Renderer
//
//

const Renderer = (function() {
    const cells = Array.from(document.querySelectorAll('.grid-cell'));
    let symbol = "X";
    let gameOver = false;

    setSymbol(symbol);


    function setSymbol(toSymbol) {
        console.log("setSymbol called");
        symbol = toSymbol;
        removeListeners(); // Remove existing listeners for the previous symbol
        setListeners();    // Set new event listeners
    };

    function setGameover(toSet) {
        gameOver = toSet;
    };



    





    // GameBoard renderer
    function resetBoard() {
        const cleanBoard = [
            ['.', '.', '.'],
            ['.', '.', '.'],
            ['.', '.', '.'],
        ];
        renderGameBoard(cleanBoard);
    }

    function renderGameBoard(gameBoard) {
        const flatBoard = gameBoard.reduce((acc, val) => acc.concat(val), []);
        for (let index in flatBoard) {
            if (flatBoard[index] !== '.') {
                cells[index].textContent = flatBoard[index]; 
            }
        }

    }

    // Score renderer

    function setScore(first, second) {
        const player1 = document.querySelector("#player1-score");
        const player2 = document.querySelector("#player2-score");
        player1.textContent = first;
        player2.textContent = second;

    }




    // Set and remove listener functions for click and hover
    function setListeners() {
        cells.forEach((cell) => {
            cell.addEventListener("click", (event) => cellClick(event));
            cell.addEventListener("mouseenter", (event) => cellMouseEnter(event));
            cell.addEventListener("mouseleave", (event) => cellMouseLeave(event));
        });
    };

    function removeListeners() {
        cells.forEach((cell) => {
            cell.removeEventListener("click", (event) => cellClick(event));
            cell.removeEventListener("mouseenter", (event) => cellMouseEnter(event));
            cell.removeEventListener("mouseleave", (event) => cellMouseLeave(event));
        })
    }

    function cellClick(event) {
        if (!gameOver) {
            const cell = event.currentTarget;
            if (cell.classList.contains("cell-hover")) {
                cell.textContent = symbol;
                cell.classList.remove("cell-hover");
                Game.receiveClick(cell);
            };
        };
    }

    function cellMouseEnter(event) {
        if (!gameOver) {
            const cell = event.currentTarget;
            if (!cell.textContent) {
                cell.classList.add("cell-hover");
                cell.textContent = symbol;
            };
        };
    }

    function cellMouseLeave(event) {
        if (!gameOver) {
            const cell = event.currentTarget;
            if (cell.classList.contains("cell-hover")) {
                cell.textContent = "";
                cell.classList.remove("cell-hover");
            };
        };
    }
    




    return {
        setSymbol,
        renderGameBoard,
        setGameover,
        resetBoard,
        setScore,
    }
})();


export default Renderer;
