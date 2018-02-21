

def validate_password(password):
    if " " in password:
        return "Password should not contain any whitespaces"
    else:
        return ""


def validate_request(form):
    if 'username' not in form:
        return "Please do not fuck with the request!"
    elif 'password' not in form:
        return "Please do not fuck with the request!"
    elif 'task' not in form:
        return "Please do not fuck with the request!"
    elif form['task'] != 'login' and form['task'] != 'register':
        return "Please do not fuck with the request!"
    else:
        return ""