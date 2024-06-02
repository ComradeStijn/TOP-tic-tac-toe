export default function createPlayer(name) {
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

