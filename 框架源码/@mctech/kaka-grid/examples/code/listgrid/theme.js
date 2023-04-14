(function() {
    var records;

    var grid = function() {
        var userTheme = {
            font: "12px Arial,\"PingFang SC\",\"Microsoft YaHei\",\"微软雅黑\",\"黑体\",\"宋体\",sans-serif",
            frozenRowsFont: "14px sans-serif",
            color: "red",
            frozenRowsColor: "red",
            defaultBgColor: "#FDD",
            frozenRowsBgColor: "#EAA",
            focusBgColor: function(args) {
                if (args.grid.frozenRowCount > args.row) {
                    return undefined;
                } else {
                    return undefined;
                }
            },
            selectionBgColor: "rgba(255, 187, 221, 1)", //"#FBD", // 这里使用透明时，滚动条滚动会导致重影
            selectionDragBgColor: "rgba(255, 187, 221, .2)",
            underlayBackgroundColor: "transparent", // "#FEE",
            defaultRowHeight: 30,
            defaultColWidth: 80,
            // 颜色可以是回调函数
            frozenRowsBorderColor: function(args) {
                if (args.grid.frozenRowCount - 1 === args.row) {
                    // [top, right and left, bottom]
                    return ["#F88", "#F88", "red"];
                } else {
                    return "#F88";
                }
            },
            borderColor: function(args) {
                if (args.grid.colCount - 1 === args.col) {
                    // [top, right, bottom, left]
                    return ["red", "#F88", "red", null];
                } else {
                    // [top and bottom, right and left]
                    return ["red", null];
                }
            },
            gridBorderColor: "#F88",
            gridBorderWidth: 1,
            highlightBorderColor: "#F0F",
            highlightBgColor: "",
            checkbox: {
                uncheckBgColor: "#FDD",
                checkBgColor: "rgb(255, 73, 72)",
                borderColor: "red",
            },
            button: {
                color: "#FDD",
                bgColor: "#F55",
            },
            header: {
                sortArrowColor: "#D00"
            },
            switch: {
                borderColor: "#F88",
                checkBgColor: "rgb(255, 73, 72)",
                uncheckBgColor: "#FDD",
            },
            tree: {
                lineColor: "#F88",
                buttonColor: "#FDD",
                buttonBgColor: "#F88",
                buttonBorderColor: "#F88",
            }
        };
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            // defaultRowHeight: 30,
            // defaultColWidth: 80,
            // underlayBackgroundColor: "#FEE",
            headerRowHeight: 35, // headerRowHeight: [60, 40],
            header: [{
                field: "check",
                width: "10%",
                columnType: "check",
                action: "check",
            }, {
                field: "id",
                caption: "ID",
                width: "10%", // 85,
            }, {
                caption: "Name",
                headerStyle: {
                    textAlign: "center",
                },
                columns: [{
                    field: "fname",
                    caption: "First Name",
                    width: "10%",
                    // minWidth: 150,
                }, {
                    field: "lname",
                    caption: "Last Name",
                    width: "10%",
                    // minWidth: 150,
                },{
                    field: "fname",
                    caption: "First Name",
                    width: "10%",
                    // minWidth: 150,
                }, {
                    field: "lname",
                    caption: "Last Name",
                    width: "10%",
                    // minWidth: 150,
                }]
            }, {
                caption: "",
                width: "20%", //120,
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    caption: "SHOW REC"
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }, {
                field: "switch",
                width: "20%",
                columnType: "switch",
                action: "switch",
            }],
            records: records,
            borderMode: 'content-border',
        });
        grid.theme = userTheme;
        return grid;
    };

    var data = function() {
        var records = [{
            "check": true,
            "id": 1,
            "fname": "Sophia",
            "lname": "Smith",
            "switch": true,
        }, {
            "check": false,
            "id": 2,
            "fname": "Emma",
            "lname": "Ortiz",
            "switch": false,
        }, {
            "check": true,
            "id": 3,
            "fname": "Isabella",
            "lname": "Bennett",
            "switch": false,
        }, {
            "check": false,
            "id": 4,
            "fname": "Mia",
            "lname": "Lee",
            "switch": true,
        }];
        return records;
    };
    records = data();

    var style = ".al-right {\n" +
        "    text-align: center;\n" +
        "}";

    window.examples.push({
        key: "listgrid/theme",
        grid: grid,
        style: style,
        data: data,
    });
})();