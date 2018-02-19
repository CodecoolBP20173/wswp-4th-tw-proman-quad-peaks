from json import loads
from flask import Flask, render_template, session, jsonify, request
import queries

app = Flask(__name__)
app.secret_key = "FJASIDKASÁDASÁKDNAÁSNDÁPIASNDÁPASÁDJSAÓOÓÖÖÓß$äĐ$äđßĐ"


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route("/get_boards")
def get_boards():
    # DELETE THIS
    session['group_id'] = 1

    group_id = session['group_id']
    data = queries.get_data(group_id)
    return jsonify(data)


@app.route("/save_boards", methods=['POST'])
def save_boards():
    group_id = session['group_id']
    data = loads(request.form['data'])
    print(data)
    boards = data['boards']
    cards = data['cards']
    queries.save_data(group_id, cards, boards)
    return "OK"


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
