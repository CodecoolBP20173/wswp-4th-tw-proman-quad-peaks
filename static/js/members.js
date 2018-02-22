let kick_buttons = document.getElementsByClassName('button-kick-member');

let search_pattern_holder = document.getElementById('search-account-input');


function loadGroupMembers() {
    $.getJSON('/get_group_members', function (response) {

         groupMembersTableMaker(response);
         kickButtonListener();
    });


}


function getSearchResults() {
        if (search_pattern_holder.value.length > 0) {
            $.getJSON('search/' + search_pattern_holder.value, function (response) {
                if (response && response.length > 0) {
                    results = response;
                    document.getElementById('table_holder_for_search').innerHTML = '<table id="search_results_table">'
                        + '</table>';
                    searchResultsTableMaker(results);
                    addMemberListener(results)
                } else {
                    document.getElementById('table_holder_for_search').innerHTML = '<h3>No Results</h3>';
                }
            });
        }
    }





function searchListener() {

    search_pattern_holder.addEventListener('input', function () {
        getSearchResults();

    });

}


function kickButtonListener() {
    for (let i = 0; i < kick_buttons.length; i++) {
        kick_buttons[i].addEventListener('click', function (event) {
                $.ajax({
                    dataType: "text",
                    url: 'delete_user',
                    data: {
                        'id': event.target.id
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

function searchResultsTableMaker(listOfDicts) {
    let contentClean = '';
    for (let i = 0; i < listOfDicts.length; i++) {
        console.log(listOfDicts[i].username);
        contentClean += `<tr><td>`
            + listOfDicts[i].username
            + `</td><td><button class="button-add-member">Hire User</button></td></tr>`
    }
    document.getElementById('search_results_table').innerHTML = contentClean;
}


function groupMembersTableMaker(listOfDicts) {
    let contentClean = '';
    for (let i = 0; i < listOfDicts.length; i++) {
        console.log(listOfDicts[i].username);
        contentClean += `<tr><td>`
            + listOfDicts[i].username
            + `</td><td><button class="button-kick-member" id="` + listOfDicts[i].id + `">Remove Member</button></td></tr>`
    }
    document.getElementById('table-members').innerHTML = contentClean;
}



function addMemberListener(listOfDicts) {
    let buttons = document.getElementsByClassName("button-add-member");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            $.ajax({
                dataType: "text",
                url: 'add_user_to_group',
                data: {
                    'id': listOfDicts[i].id
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
            loadGroupMembers();
            getSearchResults();

        })
    }
}



loadGroupMembers();

searchListener();

//addMemberListener();