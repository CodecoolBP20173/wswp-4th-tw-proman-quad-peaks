function show_groups() {
    $group_table = $('#group_table');
    $.ajax({
        dataType: "text",
        url: 'get_groups',
        success: function (response) {
            $group_table.empty();
            let groups = JSON.parse(response);
            console.log(groups);
            for (let i = 0; i < groups.length; i++) {
                $row = $('<tr/>');

                $nameTd = $('<td/>');
                $showTd = $('<td/>');
                $removeTd = $('<td/>');

                $showButton = $('<button/>');
                $removeButton = $('<button/>');

                $nameTd.addClass("btn btn-link col text-left collapsed");

                $showButton.on('click', function (event) {
                    console.log("should show board page");
                    group_id = event.target.id;
                    window.location.href = '/' + group_id;
                });

                $removeButton.on('click', function (event) {
                    console.log('should remove group');
                    group_id = event.target.id;
                    $.ajax({
                        dataType: "text",
                        url: 'remove_group',
                        data: {
                            'group_id': group_id
                        },
                        cache: false,
                        type: "POST",
                        success: function (response) {
                            console.log(response);
                            show_groups();
                        },
                        error: function (xhr) {
                            alert('something went wrong');
                        }
                    });
                });

                $showButton.addClass("showButton");
                $removeButton.addClass("removeButton");

                $showButton.attr("id", groups[i].group_id);
                $removeButton.attr("id", groups[i].group_id);

                $showButton.append('Show');
                $removeButton.append('Remove');

                $nameTd.append(groups[i].name);

                $showTd.append($showButton);
                $removeTd.append($removeButton);

                $row.append($nameTd);
                $row.append($showTd);
                $row.append($removeTd);

                $group_table.append($row);
            }
        }
    });
}

$('#addGroupSaveButton').on('click', function () {
    addGroup();
});

function addGroup() {
    let title = $('#newGroupInput').val();
    $.ajax({
        dataType: "text",
        url: 'add_group',
        data: {
            'title': title
        },
        cache: false,
        type: "POST",
        success: function (response) {
            console.log(response);
            show_groups();
        },
        error: function (xhr) {
            alert('something went wrong');
        }
    });
    $('#newCardInput').val("")
}

show_groups();
