

def validate_password(password):
    if " " in password:
        return "Password should not contain any whitespaces"
    else:
        return ""