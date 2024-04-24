const gameBoard = ( () => {
    let board = [];

    const createBoard =  () => {
        for(let i = 0; i < 9; i++){
            board.push(null);
        }
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
        return board[index];
    }

    const checkForWin = () => {
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
        for(let i = 0; i < winCombos.length-1; i++){
            const [a, b, c] = winCombos[i];
            if(board[a] != null && board[a] === board[b] && board[a] === board[c]){
                gameController.callWinner();
            }
        }

        //Check for tie
        if(!board.includes(null)){
            gameController.callTie();
        }
    }

    createBoard();

    return {
        resetBoard, updateBoard, checkIfMarkerExist, checkForWin
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
    const playerOne = createPlayer(prompt(`Enter Player 1's name:`, 'PlayerOne'), 'X');
    alert(`${playerOne.name}'s marker is "${playerOne.marker}"`);
    const playerTwo = createPlayer(prompt(`Enter Player 2's name:`, 'PlayerTwo'), 'O');
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

    const getUserInputForIndex = () => {
        let userInputIndex = prompt(`${currentPlayerName}'s turn enter index`);
            
            //Check if array already contains a marker
            while (gameBoard.checkIfMarkerExist(userInputIndex) !== null) {
                userInputIndex = prompt(`${currentPlayerName}'s turn try a different index`);
            } 
        
        return userInputIndex;

    }

    const playTurn = () => {
        gameBoard.updateBoard(getUserInputForIndex(), currentMarker);
        console.log(`turn nr.${turnCount}`);
        gameBoard.checkForWin();
        
        if(isRoundOver) {
            isRoundOver = false;
            resetGame();
        }
        else {
            setPlayerTurn();
            updateTurnCount();
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

    const playGame = () => {
        while(playerOne.getScore() < 3 && playerTwo.getScore() < 3){
            playTurn();
        }
    }

    return {
        getUserInputForIndex, callWinner, callTie, playGame
    }
})();

gameController.playGame();
