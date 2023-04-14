(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                caption: "图片",
                field: "field1",
                columnType: "image",
                style: function(rec) {
                    return {
                        imageSizing: "keep-aspect-ratio",
                        appearance: rec.field1 ? "clear-button" : "none"
                    };
                },
                action: new kakaGrid.columns.action.InlineInputEditor({
                    disableInput: true,
                    disableAction: function(rec) {
                        return !rec.field1;
                    },
                    action: function(rec, info) {
                        if (rec.field1) {
                            rec.field1 = "";
                            info.grid.invalidateCell(info.cell.col, info.cell.row);
                        }
                    },
                }),
                width: 150,
            }, {
                caption: "地址",
                field: function(rec) {
                    if (rec.field1 === "") {
                        return "预览";
                    } else {
                        return rec.field1;
                    }
                },
                width: 520,
                style: function(rec) {
                    return {
                        textAlign: "center",
                        buttonBgColor: "#aaa",
                        color: rec.field1 === "" ? "#f0f" : "#000",
                    };
                },
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    linkButton: true,
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    disabled: function(rec) {
                        return rec.field1 !== "";
                    },
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
            "field1": "https://www.baidu.com/img/bd_logo1.png?where=super",
        }, {
            "field1": "",
        }, {
            "field1": null,
        }];
        return records;
    };
    records = data();

    var style = "";

    window.examples.push({
        key: "listgrid/image",
        grid: grid,
        style: style,
        data: data,
    });
})();