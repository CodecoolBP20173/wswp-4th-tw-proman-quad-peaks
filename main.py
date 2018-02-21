from json import loads
from flask import Flask, render_template, session, jsonify, request, redirect
import bcrypt
import queries
import validate
from functools import wraps

app = Flask(__name__)
app.secret_key = "FJASIDKASÁDASÁKDNAÁSNDÁPIASNDÁPASÁDJSAÓOÓÖÖÓß$äĐ$äđßĐ"

def login_required(function):
    @wraps(function)
    def wrap(*args, **kwargs):
        if 'account_id' in session:
            return function(*args, **kwargs)
        else:
            return redirect("/login")

    return wrap

@app.route("/<int:group_id>")
@login_required
def boards(group_id):
    if queries.check_group_permission(session['account_id'], group_id):
        session['group_id'] = group_id
        return render_template('boards.html')
    else:
        return "YOU DO NOT HAVE PERMISSION"



@app.route("/get_boards")
@login_required
def get_boards():
    group_id = session['group_id']
    data = queries.get_data(group_id)
    return jsonify(data)


@app.route("/save_boards", methods=['POST'])
@login_required
def save_boards():
    group_id = session['group_id']
    data = loads(request.form['data'])
    boards_data = data['boards']
    cards_data = data['cards']
    queries.save_data(group_id, cards_data, boards_data)
    return "OK"


@app.route("/account")
@app.route("/")
@login_required
def account():
    return render_template('account.html')


@app.route("/get_groups")
def get_groups():
    account_id = session['account_id']
    groups = queries.get_groups(account_id)
    return jsonify(groups)


@app.route("/add_group", methods=['POST'])
def add_group():
    group_title = request.form['title']
    account_id = session['account_id']
    queries.add_group(account_id, group_title)
    return "OK"

@app.route("/remove_group", methods=['POST'])
def remove_group():
    group_id = request.form['group_id']
    queries.remove_group(group_id);
    return "OK"

@app.route("/remove_board", methods=['POST'])
def remove_board():
    board_id = request.form['board_id']
    queries.remove_board(board_id)
    return "OK"


@app.route("/remove_card", methods=['POST'])
def remove_card():
    card_id = request.form['card_id']
    queries.remove_card(card_id)
    return "OK"

@app.route('/members')
@login_required
def show_members_page_for_testing_purposes_definitely_rename_and_or_rewrite_this():
    members = queries.get_members(session['group_id'])
    return render_template('members.html', members=members)


@app.route('/logout')
@login_required
def logout():
    session.pop('username', None)
    session.pop('account_id', None)
    session.pop('group_id', None)
    return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html', form_type="")
    else:
        if 'button' in request.form:
            return render_template('login.html',
                                   form_type=request.form['button'],
                                   default_username="")
        else:
            message = validate.validate_request(request.form)
            if message != "":
                return render_template('login.html',
                                           form_type="",
                                           specmessage=message)
            else:
                if request.form['task'] == "login":
                    userdata = queries.get_user_by_name(request.form['username'])
                    if not userdata:
                        message = "Wrong username or password"
                        return render_template('login.html',
                                               form_type='login',
                                               default_username=request.form['username'],
                                               message=message)
                    password_hash = userdata[0]['password']
                    if bcrypt.checkpw(request.form['password'].encode('utf-8'), password_hash.encode('utf-8')):
                        session['account_id'] = userdata[0]['id']
                        session['username'] = userdata[0]['username']
                        return redirect('/account')
                    else:
                        message = "Wrong username or password"
                        return render_template('login.html',
                                               form_type='login',
                                               default_username=request.form['username'],
                                               message=message)
                else:
                    userdata = queries.get_user_by_name(request.form['username'])
                    if len(userdata) == 0:
                        message = validate.validate_password(request.form['password'])
                        if message != "":
                            return render_template('login.html',
                                               form_type='register',
                                               default_username=request.form['username'],
                                               message=message)
                        else:
                            password_hash = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
                            queries.add_user_account(request.form['username'], password_hash)
                            return redirect('/login')
                    else:
                        message = "Username already taken."
                        return render_template('login.html',
                                               form_type='register',
                                               default_username=request.form['username'],
                                               message=message)



@app.route('/delete_user', methods=['post'])
def delete_members():
    group_id = '3' #session['group_id']
    account_id = '1' #request.form['id']
    queries.delete_member(group_id, account_id)

    return "OK"




@app.route('/search/<pattern>')
def search_accounts(pattern):
    search_result = jsonify(queries.search_user(pattern))
    print(search_result)
    return search_result








def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
