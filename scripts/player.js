export default function createPlayer(myName) {
    let wins = 0;
    let name = myName;



    function getWins() {
        return wins;
    }
    
    function increaseWins() {
        wins++;
    }

    function resetWins() {
        wins = 0;
    }

    function checkWon() {
        return (wins === 3);
    }

    return {name, getWins, increaseWins, resetWins, checkWon};
}

