// Kell egy uj board megoldas ahol oszlopok es sorok vannak, hogy egyszerubb legyen win condition
//Pl. Connect four pelda a cikkbol

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
        const boardStr = board.toString();
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

    return {
        name, marker, winRound
    }
}

const gameController = (() =>{
    let turnCount = 1;
    let currentMarker = 'X';
    
    //initiate players
    const playerOne = createPlayer(prompt(`Enter Player 1's name:`, 'PlayerOne'), 'X');
    alert(`${playerOne.name}'s marker is "${playerOne.marker}"`);
    const playerTwo = createPlayer(prompt(`Enter Player 2's name:`, 'PlayerTwo'), 'O');
    alert(`${playerTwo.name}'s marker is "${playerTwo.marker}"`);

    let currentPlayer = playerOne.name;

    const updateTurnCount = () => {
        turnCount++
    }
    const setPlayerTurn = () => {
        
        //playerOne's turn
        if(turnCount%2 === 0){
            currentMarker = 'X';
            currentPlayer = playerOne.name;
        }

        //playerTwo's turn
        else {
            currentMarker = 'O';
            currentPlayer = playerTwo.name;
        }
    }

    const getUserInputForIndex = () => {
        let userInputIndex = prompt(`${currentPlayer}'s turn try a different index`);
            
            //Check if array already contains a marker
            while (gameBoard.checkIfMarkerExist(userInputIndex) !== null) {
                userInputIndex = prompt(`${currentPlayer}'s turn try a different index`);
            } 
        
        return userInputIndex;

    }

    const playTurn = () => {
        gameBoard.updateBoard(getUserInputForIndex(), currentMarker);
        console.log(`nr. of turns ${turnCount}`);
        //Check for winner goes here
        setPlayerTurn();
        updateTurnCount();
    }



    return {
        getUserInputForIndex, playTurn
    }
})();


for(let i = 0; i < 5; i++) {
    gameController.playTurn();
    gameBoard.checkForWin();
}

