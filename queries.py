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
    for board in boards:
        data_manager.execute_dml_statement("""UPDATE boards SET title=%(title)s,is_active=%(is_active)s
                                        WHERE id=%(board_id)s AND group_id=%(group_id)s""",
                                           {'title': board['title'], 'is_active': board['is_active'],
                                            'board_id': board['id'], 'group_id': group_id})

    for card in cards:
        data_manager.execute_dml_statement("""UPDATE cards SET title=%(title)s,board_id=%(board_id)s,status_id=%(status_id)s,"order"=%(order)s
                                              WHERE id=%(card_id)s
                                            """, {'title': card['title'], 'board_id': card['board_id'],
                                                  'status_id': card['status_id'], 'order': card['order'],
                                                  'card_id': card['id']})
