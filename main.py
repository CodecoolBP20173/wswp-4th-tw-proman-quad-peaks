from json import loads
from flask import Flask, render_template, session, jsonify, request
import queries

app = Flask(__name__)
app.secret_key = "FJASIDKASÁDASÁKDNAÁSNDÁPIASNDÁPASÁDJSAÓOÓÖÖÓß$äĐ$äđßĐ"


@app.route("/<int:group_id>")
def boards(group_id):
    session['group_id'] = group_id
    return render_template('boards.html')


@app.route("/get_boards")
def get_boards():
    group_id = session['group_id']
    data = queries.get_data(group_id)
    print(data)
    return jsonify(data)


@app.route("/save_boards", methods=['POST'])
def save_boards():
    group_id = session['group_id']
    data = loads(request.form['data'])
    boards_data = data['boards']
    cards_data = data['cards']
    queries.save_data(group_id, cards_data, boards_data)
    return "OK"


@app.route("/account")
def account():
    return render_template('account.html')


@app.route("/get_groups")
def get_groups():
    # DELETE THIS
    session['account_id'] = 1

    account_id = session['account_id']
    groups = queries.get_groups(account_id)
    return jsonify(groups)


@app.route("/add_group", methods=['POST'])
def add_group():
    group_title = request.form['title']
    account_id = session['account_id']
    queries.add_group(account_id, group_title)
    return "OK"


@app.route('/members')
def show_members_page_for_testing_purposes_definitely_rename_and_or_rewrite_this():
    return render_template('members.html')


@app.route('/login')
def show_login_page_for_testing_purposes_definitely_rename_and_or_rewrite_this():
    return render_template('login.html')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
