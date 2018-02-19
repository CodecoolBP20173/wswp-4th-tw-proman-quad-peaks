import data_manager


def get_data(group_id):

    boards = data_manager.execute_select("""
                                        SELECT id,title,is_active FROM boards WHERE group_id=%(group_id)s
                                        """, {'group_id': group_id})
    cards = []
    for board in boards:
        board_id = board['id']
        temp_cards = data_manager.execute_select("""SELECT id,title,board_id,status_id,"order" FROM cards
                                                    WHERE board_id=%(board_id)s""", {'board_id': board_id})
        for card in temp_cards:
            cards.append(card)
    statuses = data_manager.execute_select('SELECT * FROM statuses')
    data = {"boards": boards,
            "cards": cards,
            "statuses": statuses,
            "group_id": group_id}
    return data


def save_data(group_id, cards, boards):
    pass