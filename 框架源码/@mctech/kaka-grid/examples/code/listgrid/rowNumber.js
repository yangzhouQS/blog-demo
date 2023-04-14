(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                caption: "ID\n(No.)",
                width: 85,
                columnType: new kakaGrid.columns.type.Column({
                    convert: function(value, displayValue, cell, grid) {
                        return cell.row - grid.frozenRowCount + 1;
                    },
                }),
            }, {
                caption: "Name",
                columns: [{
                    field: "fname",
                    caption: "First Name",
                    width: "20%",
                    minWidth: 150,
                }, {
                    field: "lname",
                    caption: "Last Name",
                    width: "20%",
                    minWidth: 150,
                }]
            }, {
                caption: "",
                width: 120,
                style: {
                    textAlign: "center",
                    buttonBgColor: "#aaa",
                },
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    caption: "SHOW REC",
                    linkButton: true,
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }],
            records: records,
        });
        return grid;
    };

    var data = function() {
        var records = [{
            "fname": "Sophia",
            "lname": "Smith",
        }, {
            "fname": "Emma",
            "lname": "Ortiz",
        }, {
            "fname": "Isabella",
            "lname": "Bennett",
        }, {
            "fname": "Mia",
            "lname": "Lee",
        }];
        return records;
    };
    records = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}";

    window.examples.push({
        key: "listgrid/rowNumber",
        grid: grid,
        style: style,
        data: data,
    });
})();