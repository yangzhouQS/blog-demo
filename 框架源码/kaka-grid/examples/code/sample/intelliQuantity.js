(function() {
    var records;

    var grid = function() {
        function FROZEN_ROWS_BORDER_COLOR(args) {
            if (args.grid.frozenRowCount - 1 === args.row) {
                return ["#f2f2f2", "#f2f2f2", "#ccc7c7", "#f2f2f2"];
            } else {
                return ["#f2f2f2"];
            }
        }
        function BORDER_COLOR(args) {
            if (args.grid.frozenColCount - 1 === args.col) {
                return ["#ccc7c7", "#f2f2f2", "#ccc7c7", "#f2f2f2"];
            } else if (args.grid.colCount - 1 === args.col) {
                return ["#ccc7c7", "#f2f2f2", "#ccc7c7", "#f2f2f2"];
            } else {
                return ["#ccc7c7", "#f2f2f2"];
            }
        }
        var userTheme = {
            frozenRowsBgColor: "#81B5DC",
            frozenRowsBorderColor: FROZEN_ROWS_BORDER_COLOR,
            frozenRowsColor: "#f2f2f2",
            borderColor: BORDER_COLOR,
            highlightBorderColor: "#5E9ED6",
            selectionBgColor: "rgba(94, 158, 214, 0.5)",
        };
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            defaultRowHeight: 40,
            headerRowHeight: 30,
            header: [{
                field: "id",
                caption: "",
                width: 80,
                columnType: new kakaGrid.columns.type.Column({
                    convert: function(value, displayValue, cell, grid) {
                        return cell.row - grid.frozenRowCount + 1;
                    },
                }),
                style: {
                    textAlign: "center",
                },
            }, {
                field: "bwmc",
                caption: "部位名称",
                width: "20%",
                minWidth: 80,
                headerStyle: {
                    textAlign: "center",
                },
                style: {
                    bgColor: "#FDD",
                }
            }, {
                field: "tz1",
                caption: "特征1",
                width: "20%",
                minWidth: 80,
                headerStyle: {
                    textAlign: "center",
                },
            }, {
                field: "tz2",
                caption: "特征2",
                width: "20%",
                minWidth: 80,
                headerStyle: {
                    textAlign: "center",
                },
            }, {
                field: "tz2",
                caption: "特征2",
                width: "20%",
                minWidth: 80,
                headerStyle: {
                    textAlign: "center",
                },
            }, {
                field: "bz",
                caption: "备注",
                width: "calc(20% - 80px)",
                minWidth: 80,
                columnType: "multilinetext",
                headerStyle: {
                    textAlign: "center",
                },
            }],
            frozenColCount: 2,
            records: records,
            theme: userTheme,
            singleSelection: true, // 只允许单选单元格，不允许多选单元格
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
            }
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.SCROLL, function(d) {
            var t = d.event.target;
            if (t.scrollHeight === t.scrollTop + t.clientHeight) {
                console.log("滚动到底部");
            }
        });
        grid.focusGridCell("id", 0); // 选中单个单元格
        return grid;
    };

    var data = function() {
        var records = [{
            "id": 100,
            "bwmc": "部位名称1",
            "tz1": "",
            "tz2": "",
            "bz": "第一行111111111111111111\n第二行22222222222222222\n第三行33333333333333333333",
        }, {
            "id": 101,
            "bwmc": "部位名称2",
            "tz1": "",
            "tz2": "",
            "bz": "只有一行",
        }, {
            "id": 102,
            "bwmc": "部位名称3",
            "tz1": "",
            "tz2": "",
            "bz": "第一行111111111111111111\n第二行22222222222222222\n第三行33333333333333333333\n第四行44444444444444444444444444\n第五行555555555555555555555555",
        }, {
            "id": 103,
            "bwmc": "部位名称4",
            "tz1": "",
            "tz2": "",
            "bz": "第一行11111111111111111111111111111111\n第二行22222222222222222",
        }, {
            "id": 104,
            "bwmc": "部位名称5",
            "tz1": "",
            "tz2": "",
            "bz": "只有一行11111111111111111111111111111111",
        }];
        return records;
    };
    records = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}\n" +
        ".kaka-grid .kaka-grid__tooltip-element {\n" +
        "    color: #ddd;\n" +
        "    background-color: rgba(0, 0, 0, 0.7);\n" +
        "}";

    window.examples.push({
        key: "sample/intelliQuantity",
        grid: grid,
        style: style,
        data: data,
    });
})();