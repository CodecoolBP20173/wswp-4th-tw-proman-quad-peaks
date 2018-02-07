// It uses data_handler.js to visualize elements
dom = {
    loadBoards: function() {
        document.getElementById('addBoardSaveButton').addEventListener('click', function () {
            var boardInput = document.getElementById('newBoardInput');
            dataHandler.createNewBoard(boardInput.value, dom.showBoards)
            boardInput.value = '';
        });
       dataHandler.getBoards(this.showBoards);
    },
    showBoards: function(boards_) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardsParent = document.getElementById('boards');
        boardsParent.innerHTML='';
        boardsParent.classList.add('container');
        for (let i = 0; i < boards_.length; i++) {

            let board = boards_[i];
            let newBoard = document.createElement("button");
            boardsParent.appendChild(newBoard);
            let title = board.title;
            newBoard.innerHTML = title;
            newBoard.className = "btn btn-link collapsed col text-left" ;
            newBoard.setAttribute('data-toggle', 'collapse');
            newBoard.setAttribute('data-target', '#collapse' + i);
            newBoard.setAttribute('aria-expanded', 'false');
            newBoard.setAttribute('aria-controls', 'collapse' + i);
            let newBoardContent = document.createElement("div");
            newBoardContent.className = 'collapse col';
            newBoardContent.id = 'collapse' + i;
            newBoardContent.innerHTML = 'placeholderCard ' + i;
            boardsParent.appendChild(newBoardContent);



        }

    },
    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    }
    // here comes more features
};
