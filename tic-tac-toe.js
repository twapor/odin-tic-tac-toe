const startBtn = document.querySelector('#start-btn');

const gameBoard = ( () => {
    let board = [];

    const createBoard =  () => {
        for(let i = 0; i < 9; i++){
            board.push(null);
        }
    }
    
    const readBoardArray = () => {
        const displayBoard = board;
        return displayBoard;
    }

    const resetBoard = () => {
        for(let i = 0; i < board.length; i++){
            board.splice(i, 1, null);
        }
    }

    const updateBoard = (index, marker) => {
        board.splice(index, 1, marker);
        console.log(board);
    }

    const checkIfMarkerExist = (index) => {
        if(board[index] !== null){
            return true;
        }
        else {
            return false;
        }
    }

    const checkForWin = () => {
        let isNotWon = true;
        const winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(let i = 0; i < winCombos.length; i++){
            const [a, b, c] = winCombos[i];
            if(board[a] != null && board[a] === board[b] && board[a] === board[c]){
                isNotWon = false;
                gameController.callWinner();
            }
        }

        //Check for tie
        if(!board.includes(null) && isNotWon){
            gameController.callTie();
        }
    }

    createBoard();

    return {
        resetBoard, readBoardArray, updateBoard, checkIfMarkerExist, checkForWin
    }
})();

//player factory
const createPlayer = (name, marker) => {
    let score = 0;

    const winRound = () => {
        score++
    }

    const getScore = () => {
        return score
    }

    const resetScore = () => {
        score = 0;
    }

    return {
        name, marker, winRound, getScore, resetScore
    }
}

const gameController = (() => {
    
    //initiate players
    let playerOne = createPlayer(prompt(`Enter Player 1's name:`, 'PlayerOne'), 'X');
    alert(`${playerOne.name}'s marker is "${playerOne.marker}"`);
    let playerTwo = createPlayer(prompt(`Enter Player 2's name:`, 'PlayerTwo'), 'O');
    alert(`${playerTwo.name}'s marker is "${playerTwo.marker}"`);

    let turnCount = 1;
    let currentMarker = playerOne.marker;
    let currentPlayer = playerOne;
    let currentPlayerName = playerOne.name;
    let isRoundOver = false;

    const updateTurnCount = () => {
        turnCount++
    }
    const setPlayerTurn = () => {
        
        //playerOne's turn
        if(turnCount%2 === 0){
            currentMarker = 'X';
            currentPlayer = playerOne;
            currentPlayerName = playerOne.name;
        }

        //playerTwo's turn
        else {
            currentMarker = 'O';
            currentPlayer = playerTwo;
            currentPlayerName = playerTwo.name;
        }
    }

    const playTurn = (e) => {
        if(gameBoard.checkIfMarkerExist(e)){
            alert(`It's already taken!`);
        }
        else {
            gameBoard.updateBoard(e, currentMarker);
            console.log(`turn nr.${turnCount}`);
            gameBoard.checkForWin();


            if(playerOne.getScore() > 2 || playerTwo.getScore() > 2){
                endGame(currentPlayer);
            }

            else{
            
                if(isRoundOver) {
                    isRoundOver = false;
                    resetGame();
                    
                }
                else {
                    setPlayerTurn();
                    updateTurnCount();
                }
            }
        }
        }

    const resetGame = () => {
        gameBoard.resetBoard();
        turnCount = 1;
        currentPlayer = playerOne;
        currentPlayerName = playerOne.name;
        currentMarker = playerOne.marker;
    }

    const callWinner = () => {
        currentPlayer.winRound();
        isRoundOver = true;
        alert(`${currentPlayerName} won the round!`);
        alert(`${playerOne.name} has ${playerOne.getScore()} point while ${playerTwo.name} has ${playerTwo.getScore()} points `)
    
    }

    const callTie = () => {
        alert(`It's a tie!`);
        isRoundOver = true;
    }

    const playGame = (e) => {
        playTurn(e);
        displayController.updateDisplayBoard();
        updateScoreBoard();
        updateCurrentPlayerDisplay();
        displayController.updateDisplayBoard();

    }

    const endGame = (winner) => {
        alert(`${winner.name} won the Game`);
        const body = document.querySelector('body');
        const restart = document.createElement('button');
        const message = document.createElement('p');
        message.id = 'final-msg';
        message.textContent = `${currentPlayerName} won the game!`;
        restart.id = 'restart';
        restart.textContent = 'Restart';
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        restart.addEventListener('click', () => {
            resetGame();
            playerOne.resetScore();
            playerTwo.resetScore();
            overlay.remove();
            message.remove();
            restart.remove();
        });
        body.appendChild(overlay);
        overlay.appendChild(message);
        overlay.appendChild(restart);
    }

    const updateScoreBoard = () => {
        const scoreBoard = document.querySelector('#score');
        scoreBoard.textContent = `${playerOne.name}: ${playerOne.getScore()} - ${playerTwo.name}: ${playerTwo.getScore()}`;
    }

    updateScoreBoard();

    const updateCurrentPlayerDisplay = () => {
        const currentPlayerDisplay = document.querySelector('#current-player');
        currentPlayerDisplay.textContent = `${currentPlayerName}'s turn`
    }

    updateCurrentPlayerDisplay();

    return {
        callWinner, callTie, playGame, playTurn
    }
})();

const displayController = (() => {

    const boardContainer = document.querySelector('#board-container');

    const drawBoard = () => {
        console.log(`I'm drawing tiles!`)
        const displayBoard = gameBoard.readBoardArray();
        for(let i=0; i < displayBoard.length; i++){
            const boardTile = document.createElement('div');
            boardTile.classList.add('board-tile');
            boardTile.textContent = displayBoard[i];
            boardTile.id = i;
            boardTile.addEventListener('click', (e) => {
                console.log(e.target.id);
                gameController.playGame(e.target.id);
            });
            boardContainer.appendChild(boardTile);
            
        }
    }

    const removeAllChildNodes = (parent) => {
        console.log(`I'm removing tiles!`)
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    const updateDisplayBoard = () => {
        console.log(`I'm running!`);
        removeAllChildNodes(boardContainer);
        drawBoard();
    }

    

    return {
        updateDisplayBoard
    }
})();

displayController.updateDisplayBoard();

