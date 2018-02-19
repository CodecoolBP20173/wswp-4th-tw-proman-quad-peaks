from flask import Flask, render_template
app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route("/account")
def account():
    return render_template('account.html')


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
