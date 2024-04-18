const gameBoard = (function () {
    let board = [];

    const boardContainer = document.querySelector('#board-container');

    const createBoard = () => {
        for(let i=0; i < 9; i++){
            board.push(null);
            const boardTile = document.createElement('div');
            boardTile.style.height = "50px";
            boardTile.style.width = "50px";
            boardTile.style.backgroundColor = "red";
            boardContainer.appendChild(boardTile);
        }
    };

    createBoard();

    return {board, }
})();

const game = (function () {

})();

const player = (function () {
    const createPlayer = (name, marker) => {
        const playerName = '@' + name;
        const playerMarker = marker;
        const playerInfo = () => console.log(`${playerName} has marker ${playerMarker}`);
        return {playerName, playerMarker, playerInfo};
    };

    return {createPlayer}
})();