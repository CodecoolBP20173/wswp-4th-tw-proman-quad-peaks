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
    current_boards = data_manager.execute_select("""SELECT id FROM boards""")
    current_cards = data_manager.execute_select("""SELECT id FROM cards""")
    for board in boards:
        if is_in_current_data(current_boards, board['id']):
            data_manager.execute_dml_statement("""UPDATE boards SET title=%(title)s,is_active=%(is_active)s
                                            WHERE id=%(board_id)s AND group_id=%(group_id)s""",
                                               {'title': board['title'], 'is_active': board['is_active'],
                                                'board_id': board['id'], 'group_id': group_id})
        else:
            data_manager.execute_dml_statement(
                """INSERT INTO boards (title, is_active, group_id) VALUES (%(title)s,%(is_active)s,%(group_id)s)""",
                {'title': board['title'], 'is_active': board['is_active'],
                 'group_id': group_id})

    for card in cards:
        if is_in_current_data(current_cards, card['id']):
            data_manager.execute_dml_statement("""UPDATE cards SET title=%(title)s,board_id=%(board_id)s,status_id=%(status_id)s,"order"=%(order)s
                                                  WHERE id=%(card_id)s
                                                """, {'title': card['title'], 'board_id': card['board_id'],
                                                      'status_id': card['status_id'], 'order': card['order'],
                                                      'card_id': card['id']})
        else:
            data_manager.execute_dml_statement(
                """INSERT INTO cards (title, board_id) VALUES (%(title)s,%(board_id)s)""",
                {'title': card['title'], 'board_id': card['board_id']})


def is_in_current_data(current_data, id):
    for data in current_data:
        if data['id'] == int(id):
            return True
    return False


def get_groups(account_id):
    groups = data_manager.execute_select("""SELECT groups.id as group_id, name FROM groups JOIN account_groups a on groups.id = a.group_id
                                            WHERE a.account_id = %(account_id)s""", {'account_id': account_id})
    return groups


def add_group(account_id, title):
    group_id = data_manager.execute_dml_statement("""INSERT INTO groups (name) VALUES (%(title)s) RETURNING id""",
                                                  {'title': title})
    data_manager.execute_dml_statement(
        """INSERT INTO account_groups (account_id, group_id) VALUES (%(account_id)s,%(group_id)s)""",
        {'account_id': account_id, 'group_id': group_id})

def remove_group(group_id):
    data_manager.execute_dml_statement("""
                                        DELETE
                                        FROM groups
                                        WHERE groups.id=%(group_id)s;
                                        """, {'group_id': group_id})
def get_members(group_id):

    return data_manager.execute_select('''
                                SELECT accounts.username, accounts.id FROM accounts
                                JOIN account_groups a ON accounts.id = a.account_id
                                JOIN groups ON a.group_id = groups.id
                                WHERE groups.id = %(group_id)s;''',
                                {'group_id': group_id})


def search_user(search_pattern):
    return data_manager.execute_select(
        """SELECT id, username FROM accounts WHERE LOWER(username) LIKE LOWER(%(pattern)s)""",
        {'pattern': '%' + search_pattern + '%'}
    )


def delete_member(group_id, account_id):
    return data_manager.execute_dml_statement("""
                                        DELETE FROM account_groups
                                        WHERE account_id = %(account_id)s AND group_id = %(group_id)s;
                                        """,
                                       {'account_id': account_id, 'group_id': group_id})

def get_user_by_name(name):
    return data_manager.execute_select(
        """SELECT * FROM accounts WHERE username=%(name)s;""",
        {'name': name})


def add_user_account(name, password):
    response = data_manager.execute_dml_statement(
        """INSERT INTO accounts (username, password) VALUES (%(name)s, %(pass)s)""",
        {'name': name, 'pass': password}
    )
    return response

