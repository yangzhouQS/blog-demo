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
                style: {
                    textOverflow: "ellipsis",
                },
                field: "email",
                caption: "Email",
                width: 250
            }],
            records: records,
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.SELECTED_CELL, function(data, selected) {
            // 选择单元格事件
            if (selected) {
                console.log("SELECTED_CELL.after col:" + data.col + " row:" + data.row);
            } else {
                console.log("SELECTED_CELL.before col:" + data.col + " row:" + data.row);
            }
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CAN_DRAG_SELECTION, function(range) {
            // 返回是否允许拖动选择区域
            return range.start.row >= grid.frozenRowCount;
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.DRAG_SELECTION, function(data) {
            // data.dragDone true:拖动完成 false:拖动中
            // data.oldRange 拖动前的区域
            // data.newRange 拖动完成区域
            if (data.dragDone) {
                // 拖动完成
                var s = "[" +
                    data.oldRange.start.col + "|" +
                    data.oldRange.start.row + ", " +
                    data.oldRange.end.col + "|" +
                    data.oldRange.end.row + "] => [" +
                    data.newRange.start.col + "|" +
                    data.newRange.start.row + ", " +
                    data.newRange.end.col + "|" +
                    data.newRange.end.row + "]";
                console.log("DRAG_SELECTION:" + s);
            } else {
                // 拖动中
                if (data.newRange.start.row < grid.frozenRowCount) {
                    // 返回 false 表示目标区域无效
                    return false;
                }
            }
        });
        
        return grid;
    };

    var data = function() {
        var records = [{
            "id": 1,
            "fname": "Sophia",
            "lname": "Smith",
            "email": "sophia_smith@example.com",
        }, {
            "id": 2,
            "fname": "Emma",
            "lname": "Ortiz",
            "email": "emma_ortiz@example.com",
        }, {
            "id": 3,
            "fname": "Isabella",
            "lname": "Bennett",
            "email": "isabella_bennett@example.com",
        }, {
            "id": 4,
            "fname": "Mia",
            "lname": "Lee",
            "email": "mia_lee@example.com",
        }, {
            "id": 5,
            "fname": "Jacob",
            "lname": "White",
            "email": "jacob_white@example.com",
        }, {
            "id": 6,
            "fname": "Harper",
            "lname": "Flores",
            "email": "harper_flores@example.com",
        }, {
            "id": 7,
            "fname": "Emily",
            "lname": "Peterson",
            "email": "emily_peterson@example.com",
        }];
        return records;
    };
    records = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}";

    window.examples.push({
        key: "listgrid/dragSelection",
        grid: grid,
        style: style,
        data: data,
    });
})();