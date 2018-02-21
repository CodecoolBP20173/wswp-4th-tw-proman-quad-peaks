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
        $.ajax({
            dataType: "text",
            url: 'get_boards',
            success: function (response) {
                dataHandler._data = JSON.parse(response);
                console.log(dataHandler._data);
                dom.loadBoards();
            }
        });
    },
    _saveData: function () {
        // it is not called from outside
        // saves the data from this._data to local storage
        $.ajax({
            dataType: "text",
            url: 'save_boards',
            data: {
                'data': JSON.stringify(dataHandler._data)
            },
            cache: false,
            type: "POST",
            success: function (response) {
                if (response === 'OK')
                {
                    console.log('data saved')
                }
                else{
                    alert('could not save data');
                }

            },
            error: function (xhr) {
                alert('could not save data');
            }
        });
        //localStorage.setItem(this.keyInLocalStorage, JSON.stringify(this._data));
    },
    init: function () {
        this._loadData();
    },
    getBoards: function (callback = null) {
        callback(this._data.boards);
    },
    getCardsByBoardId: function (boardId) {
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
    getStatues: function () {
        return this._data.statuses;
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        this._data.boards.unshift({
            "id": -1,
            "title": boardTitle,
            "is_active": 'true'
        });
        this._saveData();
        this._loadData();
        //this.getBoards(callback);
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        this._data.cards.push({
            "id": -1,
            "title": cardTitle,
            "board_id": boardId,
            "status_id": statusId,
            "order": this.generateCardOrder()
        },);
        this._saveData();
        this._loadData();
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
