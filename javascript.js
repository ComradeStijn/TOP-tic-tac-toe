import Game from './scripts/game.js';






// Renderer
//
//


const Renderer = (function() {
    const cells = document.querySelectorAll('.grid-cell');
    let symbol = "X";

    function setSymbol(toSymbol) {
        console.log("setSymbol called");
        symbol = toSymbol;
        removeListeners(); // Remove existing listeners for the previous symbol
        setListeners();    // Set new event listeners
    };




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
        const cell = event.currentTarget;
        if (cell.classList.contains("cell-hover")) {
            cell.textContent = symbol;
            cell.classList.remove("cell-hover");
        };
    }

    function cellMouseEnter(event) {
        const cell = event.currentTarget;
        if (!cell.textContent) {
            cell.classList.add("cell-hover");
            cell.textContent = symbol;
        };
    }

    function cellMouseLeave(event) {
        const cell = event.currentTarget;
        if (cell.classList.contains("cell-hover")) {
            cell.textContent = "";
            cell.classList.remove("cell-hover");
        };
    }
    


    

    return {
        setSymbol,
    }
})();



Renderer.setSymbol("O");
Renderer.setSymbol("L")