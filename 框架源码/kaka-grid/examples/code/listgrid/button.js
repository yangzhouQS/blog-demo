(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "id",
                caption: "ID",
                width: 85,
                headerStyle: {
                    textAlign: "center",
                },
            }, {
                caption: "LinkButton",
                width: 42,
                maxWidth: 42,
                minWidth: 42,
                colSpan:2, // 横向合并列头单元格
                headerStyle: {
                    textAlign: "center",
                },
                icon: function(rec) {
                    return {
                        path: "M16,9.2H9.2V16H6.8V9.2H0V6.8h6.8V0h2.5v6.8H16V9.2z",
                        width: 16,
                    };
                },
                style: {
                    textAlign: "center",
                    buttonBgColor: "blue",
                    color: "rgba(0, 0, 255, .5)",
                },
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    linkButton: true,
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }, {
                width: 42,
                maxWidth: 42,
                minWidth: 42,
                icon: {
                    path: "M11.4,13.1L6.6,8.3l-4.8,4.8l-1.8-1.7l4.8-4.8L0,1.8l1.7-1.8l4.8,4.8L11.3,0l1.8,1.7L8.3,6.5l4.8,4.8L11.4,13.1z",
                    width: 16,
                },
                style: {
                    textAlign: "center",
                    buttonBgColor: "red",
                    color: "rgba(255, 0, 0, .5)",
                },
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    linkButton: true,
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }, {
                caption: "Button",
                width: 120,
                colSpan:2, // 横向合并列头单元格
                headerStyle: {
                    textAlign: "center",
                },
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    caption: "SHOW REC",
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }, {
                width: 120,
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    caption: "SHOW REC",
                }),
                style: {
                    buttonBgColor: "red",
                },
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }],
            records: records,
            theme: {
                borderColor: function(args) {
                    if (args.col === 1) {
                        return ["#ccc7c7", null, "#ccc7c7", "#f2f2f2"];
                    } else if (args.col === 2) {
                        return ["#ccc7c7", "#f2f2f2", "#ccc7c7", null];
                    } else {
                        return ["#ccc7c7", "#f2f2f2"];
                    }
                },
                button: {
                    bgColor: "#2196F3",
                    color: "#FFF",
                },
                checkbox: {
                    borderColor: "rgba(0, 0, 0, 0.26)",
                    checkBgColor: "rgb(76, 73, 72)",
                    uncheckBgColor: "#FFF",
                },
                color: "rgba(0, 0, 0, 0.87)",
                defaultBgColor: "#FFF",
                frozenRowsBgColor: "#FFF",
                frozenRowsBorderColor: function(args) {
                    if (args.grid.frozenRowCount - 1 === args.row) {
                        return ["#f2f2f2", "#f2f2f2", "#ccc7c7", "#f2f2f2"];
                    } else {
                        return ["#f2f2f2"];
                    }
                },
                frozenRowsColor: "rgba(0, 0, 0, 0.54)",
                header: {
                    sortArrowColor: "rgba(0, 0, 0, 0.38)",
                },
                highlightBorderColor: "#5E9ED6",
                selectionBgColor: "#CCE0FF",
                selectionDragBgColor: "#EAF2FF",
                underlayBackgroundColor: "#FFF",
            },
        });
        return grid;
    };

    var data = function() {
        var records = [{
            "id": 1,
        }, {
            "id": 2,
        }, {
            "id": 3,
        }, {
            "id": 4,
        }];
        return records;
    };
    records = data();

    var style = "";

    window.examples.push({
        key: "listgrid/button",
        grid: grid,
        style: style,
        data: data,
    });
})();