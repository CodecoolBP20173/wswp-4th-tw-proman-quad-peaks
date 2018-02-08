// It uses data_handler.js to visualize elements
dom = {
    global : {
        selectedAddButtonBoardId : 0,
    },
    loadBoards: function() {
        document.getElementById('addBoardSaveButton').addEventListener('click', function () {
            var boardInput = document.getElementById('newBoardInput');
            dataHandler.createNewBoard(boardInput.value, dom.showBoards);
            boardInput.value = '';
        });
        document.getElementById('addCardSaveButton').addEventListener('click', function () {
            var cardTitleInput = document.getElementById('newCardInput');
            dataHandler.createNewCard(cardTitleInput.value,dom.global.selectedAddButtonBoardId,1,dom.showBoards);
            cardTitleInput.value = '';
        });
       dataHandler.getBoards(this.showBoards);
    },
    showBoards: function(boards_) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        var drag_containers = dragula({
        });
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
            let addCardButton = document.createElement('button');
            //  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#boardAddModal">
            let buttonRow = document.createElement('div');
            buttonRow.classList.add('row');
            addCardButton.className = "btn btn-primary";
            addCardButton.setAttribute("data-toggle", "modal");
            addCardButton.setAttribute("data-target", "#cardAddModal");
            addCardButton.innerHTML = 'Add Card';
            addCardButton.addEventListener('click', function () {
                dom.setSelectedAddButon(board.id);
            });
            buttonRow.appendChild(addCardButton);
            newBoard.className = "btn btn-link col text-left";
            newBoard.setAttribute('data-toggle', 'collapse');
            newBoard.setAttribute('data-target', '#collapse' + i);
            newBoard.setAttribute('aria-expanded', board.is_active);
            newBoard.setAttribute('aria-controls', 'collapse' + i);
            newBoard.addEventListener('click' , function () {
                let reverseStatus;
                if(this.getAttribute('aria-expanded') === 'true')
                {
                    reverseStatus = 'false';
                }
                else{
                    reverseStatus = 'true';
                }
               dataHandler.setActiveStatusForBoard(reverseStatus, board.id);
            });
            let statuses = dataHandler.getStatues();
            let newBoardContent = document.createElement("div");
            let statusRow = document.createElement('div');
            statusRow.classList.add('row');
            newBoardContent.appendChild(buttonRow);
            newBoardContent.appendChild(statusRow);
            let columns =[];
            for(let j = 0; j < statuses.length; j++)
            {
                let column = document.createElement('div');
                statusRow.appendChild(column);
                column.id = statuses[j].id;
                column.classList.add('col');
                column.innerHTML = statuses[j].name;
                columns.push(column);
                drag_containers.containers.push(column);
            }

            newBoardContent.className = 'col container collapse';
            if(board.is_active === 'true')
            {
                newBoardContent.classList.add('show')
            }
            newBoardContent.id = 'collapse' + i;
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
    },
    setSelectedAddButon : function (boardId) {
        this.global.selectedAddButtonBoardId = boardId;
    }
    // here comes more features
};
