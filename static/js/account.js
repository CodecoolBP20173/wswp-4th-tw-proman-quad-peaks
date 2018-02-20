function show_groups() {
    $group_table = $('#group_table');
    $.ajax({
            dataType: "text",
            url: 'get_groups',
            success: function (response) {
                $group_table.empty();
                let groups = JSON.parse(response);
                console.log(groups);
                for(let i = 0; i < groups.length; i++)
                {
                    $row = $('<tr/>');

                    $nameTd = $('<td/>');
                    $showTd = $('<td/>');
                    $removeTd = $('<td/>');

                    $showButton = $('<button/>');
                    $removeButton = $('<button/>');

                    $nameTd.addClass("btn btn-link col text-left collapsed");
                    $showButton.id = groups[i].group_id;
                    $removeButton.id = groups[i].group_id;

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

show_groups();