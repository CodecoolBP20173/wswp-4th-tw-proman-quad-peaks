// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _loadData: function () {
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
        this._data = JSON.parse(localStorage.getItem(this.keyInLocalStorage))
    },
    _saveData: function () {
        // it is not called from outside
        // saves the data from this._data to local storage
        localStorage.setItem(this.keyInLocalStorage, JSON.stringify(this._data));
    },
    init: function () {
        this._loadData();
    },
    getBoards: function (callback = null) {
        // the boards are retrieved and then the callback function is called with the boards
        callback(this._data.boards);
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        let allCards = this._data.cards;
        let cardsByBoardId = [];
        for (let i = 0; i < allCards.length; i++) {
            if (allCards[i].board_id === boardId) {
                cardsByBoardId.push(allCards[i]);
            }
        }
        dataHandler.putCardsInOrder(cardsByBoardId);
        return cardsByBoardId;
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    getStatues: function () {
        return this._data.statuses;
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        this._data.boards.unshift({
            "id": this.generateBoardId(),
            "title": boardTitle,
            "is_active": 'true'
        });
        this._saveData();
        this.getBoards(callback);
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        this._data.cards.push({
            "id": this.generateCardId(),
            "title": cardTitle,
            "board_id": boardId,
            "status_id": statusId,
            "order": this.generateCardOrder()
        },);
        this._saveData();
        callback(this._data.boards);
    },
    // here comes more features
    generateBoardId: function () {
        var boards = this._data.boards;
        max_id = 0;
        for (let i = 0; i < boards.length; i++) {
            let currentId = parseInt(boards[i].id);
            if (currentId > max_id) {
                max_id = currentId;
            }
        }
        return max_id + 1;
    },
    generateCardId: function () {
        var cards = this._data.cards;
        max_id = 0;
        for (let i = 0; i < cards.length; i++) {
            let currentId = parseInt(cards[i].id);
            if (currentId > max_id) {
                max_id = currentId;
            }
        }
        return max_id + 1;
    },
    generateCardOrder: function () {
        var cards = this._data.cards;
        max_order = 0;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].status_id === 1) {
                if (max_order < cards[i].order) {
                    max_order = cards[i].order;
                }
            }
        }
        return max_order + 1;
    },

    setActiveStatusForBoard: function (status, boardId) {
        for (let i = 0; i < this._data.boards.length; i++) {
            if (this._data.boards[i].id == boardId) {
                this._data.boards[i].is_active = status;
                break;
            }
        }
        this._saveData();
    },
    setStatusIdForCard: function (card_id, status_id, board_id) {
        for (let i = 0; i < this._data.cards.length; i++) {
            if (this._data.cards[i].id == card_id) {
                console.log('saved status');
                this._data.cards[i].status_id = status_id;
                this._data.cards[i].board_id = board_id;
                break;
            }
        }
        this._saveData();
    },
    setOrderForCard: function (card_id, order) {
        for (let i = 0; i < this._data.cards.length; i++) {
            if (this._data.cards[i].id == card_id) {
                console.log('saved order');
                this._data.cards[i].order = order;
                break;
            }
        }
        this._saveData();
    },
    putCardsInOrder: function (cards) {
        for (let i = 0; i < cards.length; i++) {
            let temp = cards[i];
            for (var j = i - 1; j >= 0 && cards[j].order > temp.order; j--) {
                cards[j + 1] = cards[j];
            }
            cards[j + 1] = temp;
        }
    }
};
