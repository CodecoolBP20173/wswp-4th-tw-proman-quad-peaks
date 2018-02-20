let kick_buttons = document.getElementsByClassName('button-kick-member');

function kickButtonListener() {
    for (i = 0; i < kick_buttons.length; i++) {
        kick_buttons[i].addEventListener('click', function () {
            $.ajax({
                dataType: "text",
                url: 'delete_user',
                data: {
                    'id': $(this).id
                },
                cache: false,
                type: "POST",
                success: function (response) {
                    console.log(response);
                },
                error: function (xhr) {
                    alert('something went wrong');
                }
            });
            $(this).parent().parent().remove();
        }
        )
    }
}
kickButtonListener();