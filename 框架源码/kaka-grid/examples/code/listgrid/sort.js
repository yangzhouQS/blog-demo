(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "id",
                caption: "ID",
                width: 85,
                // sort: true, // 允许排序 // 兼容性保留，以后使用headerAction、headerType
                headerType: "sort",
                headerAction: "sort",
            }, {
                caption: "Name",
                columns: [{
                    field: "fname",
                    caption: "First Name",
                    width: "20%",
                    minWidth: 150,
                    // sort: function(order, col, grid) { // 自定义排序逻辑
                    //     var compare = order === "desc"
                    //         ? function(v1, v2) { return v1 === v2 ? 0 : v1 > v2 ? 1 : -1 }
                    //         : function(v1, v2) { return v1 === v2 ? 0 : v1 < v2 ? 1 : -1 };
                    //     records.sort(function(r1, r2) {
                    //         return compare(r1.fname, r2.fname);
                    //     });
                    //     grid.records = records;
                    // },
                    headerStyle: function() {
                        return { sortArrowColor: "blue" };
                    },
                    headerType: new kakaGrid.headers.type.SortHeader(),
                    headerAction: new kakaGrid.headers.action.SortHeaderAction({
                        sort: function(options) {
                            var compare = options.order === "desc"
                                ? function(v1, v2) { return v1 === v2 ? 0 : v1 > v2 ? 1 : -1; }
                                : function(v1, v2) { return v1 === v2 ? 0 : v1 < v2 ? 1 : -1; };
                            var field = grid.getColumn(options.col).field;
                            records.sort(function(r1, r2) {
                                return compare(r1[field], r2[field]);
                            });
                            options.grid.records = records;
                        },
                    }),
                }, {
                    field: "lname",
                    caption: "Last Name",
                    width: "20%",
                    minWidth: 150,
                    headerType: "sort",
                    headerAction: "sort",
                    headerStyle: { sortArrowColor: "red" }, // 排序箭头颜色
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
                }),
            }],
            records: records,
        });
        
        // 重置grid的排序，改变sortState后不会自动刷新，须调用invalidate刷新
        grid.sortState = null;
        grid.invalidate();

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
        key: "listgrid/sort",
        grid: grid,
        style: style,
        data: data,
    });
})();