// It uses data_handler.js to visualize elements
dom = {
    loadBoards: function() {
        document.getElementById('addBoardSaveButton').addEventListener('click', function () {
            var boardInput = document.getElementById('newBoardInput');
            dataHandler.createNewBoard(boardInput.value, dom.showBoards);
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
            let cards = dom.loadCards(board.id);
            let newBoard = document.createElement("button");
            boardsParent.appendChild(newBoard);
            let title = board.title;
            newBoard.innerHTML = title;
            newBoard.className = "btn btn-link collapsed col text-left" ;
            newBoard.setAttribute('data-toggle', 'collapse');
            newBoard.setAttribute('data-target', '#collapse' + i);
            newBoard.setAttribute('aria-expanded', 'false');
            newBoard.setAttribute('aria-controls', 'collapse' + i);
            let statuses = dataHandler.getStatues();
            let newBoardContent = document.createElement("div");
            let row = document.createElement('div');
            row.classList.add('row');
            newBoardContent.appendChild(row);
            let columns =[];
            for(let j = 0; j < statuses.length; j++)
            {
                let column = document.createElement('div');
                row.appendChild(column);
                column.id = statuses[j].id;
                column.classList.add('col');
                column.innerHTML = statuses[j].name;
                columns.push(column);
            }
            newBoardContent.className = 'collapse col';
            newBoardContent.id = 'collapse' + i;
            newBoardContent.classList.add('container');
            boardsParent.appendChild(newBoardContent);

            dom.showCards(cards,columns);
        }

    },
    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
        return dataHandler.getCardsByBoardId(boardId);
    },
    showCards: function(cards, columns) {
        // shows the cards of a board
        // it adds necessary event listeners also
        for(let i = 0; i < cards.length; i++)
        {
            for(let j = 0; j < columns.length; j++)
            {
                if(cards[i].status_id == columns[j].id)
                {
                    let newCard = document.createElement('div');
                    newCard.innerHTML = cards[i].title;
                    columns[j].appendChild(newCard);
                }
            }
        }
    }
    // here comes more features
};
