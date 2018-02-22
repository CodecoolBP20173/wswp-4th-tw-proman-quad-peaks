// It uses data_handler.js to visualize elements
dom = {
    global : {
        selectedAddButtonBoardId : 0,
    },
    init : function() {
        document.getElementById('addBoardSaveButton').addEventListener('click', function () {
            var boardInput = document.getElementById('newBoardInput');
            if(boardInput.value.length > 0)
            {
                dataHandler.createNewBoard(boardInput.value, dom.showBoards);
                boardInput.value = '';
            }
            else
            {
                alert('Board title should be at least 1 character long');
            }

        });
        document.getElementById('addCardSaveButton').addEventListener('click', function () {
            var cardTitleInput = document.getElementById('newCardInput');
            if(cardTitleInput.value.length > 0)
            {
                dataHandler.createNewCard(cardTitleInput.value,dom.global.selectedAddButtonBoardId,1,dom.showBoards);
                cardTitleInput.value = '';
            }
            else
            {
                alert('Card title should be at least 1 character long');
            }

        });
    },
    loadBoards: function() {
       dataHandler.getBoards(this.showBoards);
    },
    showBoards: function(boards_) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        var drag_containers = dragula({}).on('drop', dom.onDrop);
        let boardsParent = document.getElementById('boards');
        boardsParent.innerHTML='';
        boardsParent.classList.add('container');
        let bin = document.getElementById('bin');
        let horse ='<img class="horse" src="https://media.giphy.com/media/26u45LcQt90fuhAis/giphy.gif" alt="Mountain View">';

        for (let i = 0; i < boards_.length; i++) {
            let board = boards_[i];
            let cards = dom.loadCards(board.id);
            let newBoard = document.createElement("button");
            let horseStall = document.createElement("div");
            horseStall.classList.add('horseBoardContainer');
            horseStall.innerHTML = horse;
            horseStall.appendChild(newBoard);
            boardsParent.appendChild(horseStall);
            let title = board.title;
            newBoard.innerHTML = title;
            let addCardButton = document.createElement('button');
            let removeBoardButton = document.createElement('button');
            let buttonRow = document.createElement('div');
            buttonRow.className = 'row d-flex justify-content-between';
            addCardButton.className = "btn btn-primary";
            addCardButton.setAttribute("data-toggle", "modal");
            addCardButton.setAttribute("data-target", "#cardAddModal");
            addCardButton.innerHTML = 'Add New Task';
            addCardButton.addEventListener('click', function () {
                dom.setSelectedAddButon(board.id);
            });
            removeBoardButton.innerHTML = "Remove Board!";
            removeBoardButton.id = board.id;
            removeBoardButton.className = "removeBoard";
            removeBoardButton.addEventListener('click', function () {
               dataHandler.removeBoard(this.id);
            });
            buttonRow.appendChild(addCardButton);
            buttonRow.appendChild(removeBoardButton);
            newBoard.className = "btn btn-link col text-left";
            if(board.is_active)
            {
                newBoard.classList.add("opened");
            }
            newBoard.setAttribute('data-toggle', 'collapse');
            newBoard.setAttribute('data-target', '#collapse' + i);
            newBoard.setAttribute('aria-expanded', board.is_active);
            newBoard.setAttribute('aria-controls', 'collapse' + i);
            newBoard.addEventListener('click' , function () {
                let reverseStatus;
                if(this.getAttribute('aria-expanded') === 'true')
                {
                    this.classList.remove("opened");
                    reverseStatus = 'false';
                }
                else{
                    this.classList.add("opened");
                    reverseStatus = 'true';
                }
               dataHandler.setActiveStatusForBoard(reverseStatus, board.id);
            });
            let statuses = dataHandler.getStatues();
            let newBoardContent = document.createElement("div");
            let statusRow = document.createElement('div');
            let cardRow = document.createElement('div');
            cardRow.classList.add('row');
            cardRow.innerHTML = '&nbsp;';
            statusRow.classList.add('row');
            statusRow.innerHTML = '&nbsp;';
            newBoardContent.appendChild(buttonRow);
            newBoardContent.appendChild(statusRow);
            newBoardContent.appendChild(cardRow);
            let columns =[];
            for(let j = 0; j < statuses.length; j++)
            {
                let column = document.createElement('div');
                cardRow.appendChild(column);
                column.id = board.id + "/"+ statuses[j].id;
                column.classList.add('col');
                let statusHeader = document.createElement('div');
                statusHeader.className = 'status_header col';
                statusHeader.innerHTML = statuses[j].name;
                statusRow.appendChild(statusHeader);
                columns.push(column);
                drag_containers.containers.push(column);
            }
            drag_containers.containers.push(bin);
            newBoardContent.className = 'col container collapse';
            if(board.is_active)
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
                if(cards[i].status_id == columns[j].id.split('/')[1])
                {
                    let cardContainer = document.createElement('div');
                    cardContainer.className = 'card_container';
                    let newCard = document.createElement('div');
                    newCard.id = cards[i].id;
                    newCard.innerHTML = cards[i].title;
                    newCard.setAttribute('order', cards[i].order);
                    cardContainer.appendChild(newCard);
                    columns[j].appendChild(cardContainer);
                }
            }
        }
    },
    setSelectedAddButon : function (boardId) {
        this.global.selectedAddButtonBoardId = boardId;
    },
    onDrop: function (el, target) {
        let card_id = parseInt(el.firstChild.id);
        let ids = target.id.split('/');
        console.log(ids);
        let newBoard_id = parseInt(ids[0]);
        let newStatus_id = parseInt(ids[1]);
        dom.setCardOrder(target);
        dataHandler.setStatusIdForCard(card_id, newStatus_id, newBoard_id);
        if (target.id === 'bin') {
            $('.bin').addClass("animated");
            window.setTimeout( function () {
                $('.bin').removeClass("animated");
            }, 1000)
        } else {
            console.log('fuck' + this + 'fuck');
             $('.horse').addClass("active");
            window.setTimeout( function () {
                $('.horse').removeClass("active");
            }, 2500)
        }
    },
    setCardOrder: function (column) {
        // To be called RIGHT AFTER drag-and-dropping a card
        // Parameter: the 'columns' div of the board, on which the card was moved
        // Goes through all columns (of one board), and sets the 'order' attribute of ALL cards in each
        // column to the current order, as they are found in the DOM tree.
        let cardList = column.childNodes;
        for (let j = 0; j < cardList.length; j++) {
            cardList[j].setAttribute('order', j);
            var card_id = parseInt(cardList[j].firstChild.id);
            dataHandler.setOrderForCard(card_id,j);
        }
    }


    // here comes more features
};








