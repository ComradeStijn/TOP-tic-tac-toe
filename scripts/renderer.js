import Game from './game.js';
// Renderer
//
//

const Renderer = (function() {
    const cells = Array.from(document.querySelectorAll('.grid-cell'));
    const nextGameButton = document.querySelector("#next-game");
    const resetGameButton = document.querySelector("#reset-score");
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
        if (gameOver) {
            nextGameButton.classList.remove("hidden");
        } else {
            nextGameButton.classList.add("hidden");
        }
    };


    // nextgamebutton event listener
    nextGameButton.addEventListener("click", (event) => {
        Game.nextGame();
        setGameover(false);
    });

    // Reset game button event listener
    resetGameButton.addEventListener("click", () => {
        resetBoard();
        Game.resetGame();
        setGameover(false);
    });


    // GameBoard renderer
    function resetBoard() {
        console.log('resetBoard called');
        const cleanBoard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        renderGameBoard(cleanBoard);
    }

    function renderGameBoard(gameBoard) {
        const flatBoard = gameBoard.reduce((acc, val) => acc.concat(val), []);
        for (let index in flatBoard) {
            cells[index].textContent = flatBoard[index]; 
        }

    }

    // Score renderer

    function setScore(firstUser, secondUser) {
        const player1 = document.querySelector("#player1-score");
        const player2 = document.querySelector("#player2-score");
        const firstScore = firstUser.getWins();
        const secondScore = secondUser.getWins();
        player1.textContent = firstScore;
        player2.textContent = secondScore;

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
