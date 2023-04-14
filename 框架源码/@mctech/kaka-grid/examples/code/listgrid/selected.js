(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "id",
                caption: "ID",
                width: 85,
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
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    caption: "SHOW REC"
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }],
            records: records,
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.SELECTED_CELL, function(data, selected) {
            if (selected) {
                var record = grid.getRowRecord(data.row);
                var field = grid.getField(data.col);
                if (record) {
                    var value = JSON.stringify(record[field]);
                    var range = JSON.stringify(grid.selection.range);
                    console.log("field:" + field + " value:" + value + " range:" + range);
                }
            } else {
                // selected 为 false 时，可阻止选择动作
                // return false;
            }
        });

        // 选中第一个单元格
        grid.selectCellRange(0, 0, 0, 0);
        
        // 选中第一列，第一条记录
        grid.selectCellRange(0, grid.frozenRowCount, 0, grid.frozenRowCount);

        // 选中第二条记录
        grid.selectCellRange(0, grid.frozenRowCount + 1, grid.colCount - 1, grid.frozenRowCount + 1);

        // 记录全选
        grid.selectCellRange(0, grid.frozenRowCount, grid.colCount - 1, grid.rowCount - 1);
        
        return grid;
    };

    var data = function() {
        var records = [{
            "id": 1,
            "fname": "Sophia",
            "lname": "Smith",
        }, {
            "id": 2,
            "fname": "Emma",
            "lname": "Ortiz",
        }, {
            "id": 3,
            "fname": "Isabella",
            "lname": "Bennett",
        }, {
            "id": 4,
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
        key: "listgrid/selected",
        grid: grid,
        style: style,
        data: data,
    });
})();