(function() {
    var records;

    var lookupRecords = [{
        "id": null,
        "name": "空",
    }, {
        "id": "0",
        "name": "克",
    }, {
        "id": "1",
        "name": "千克",
    }];

    var nullLookupRecords = [{
        "id": null,
        "name": "空",
    }];

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                caption: "材料",
                field: "cl",
                columnType: "default",
                action: new kakaGrid.columns.action.InlineInputEditor({
                    type: "text"
                }),
            }, {
                caption: "单位(自定义字段)",
                width: 150,
                field: function field(rec) {
                    return rec.cl ? rec.dw1 : rec.dw2;
                },
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupRecords,
                    valueField: "id",
                    captionField: "name",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupRecords,
                    valueField: "id",
                    valueType: "string",
                    captionField: "name",
                    allowOtherInput: false,
                    filterFields: ["name"],
                }),
            }, {
                caption: "单位1",
                field: "dw1",
            }, {
                caption: "单位2",
                field: "dw2",
            }],
            records: records,
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.SELECTED_CELL, function(data, selected) {
            if (selected) {
                var record = grid.getRowRecord(data.row);
                var field = grid.getField(data.col);
                var column = grid.getColumn(data.col);
                if (typeof field === "function" && record) {
                    column.action.records = record.cl ? lookupRecords : nullLookupRecords;
                    column.action.allowOtherInput = !record.cl;
                }
            }
        });
        grid.listen(kakaGrid.ListGrid.EVENT_TYPE.CHANGED_VALUE, function(data) {
            var field = data.field;

            if (typeof field === "function") {
                if (data.record.cl) {
                    data.record.dw1 = data.value;
                } else {
                    data.record.dw2 = data.value;
                }
                grid.invalidate();
            }
        });
        return grid;
    };

    var data = function() {
        var records = [{
            "cl": "材料a",
            "dw1": "0",
            "dw2": null,
        }, {
            "cl": "材料b",
            "dw1": "1",
            "dw2": null,
        }, {
            "cl": "材料c",
            "dw1": null,
            "dw2": null,
        }, {
            "cl": null,
            "dw1": null,
            "dw2": null,
        }, {
            "cl": null,
            "dw1": null,
            "dw2": "斤",
        }, {
            "cl": null,
            "dw1": null,
            "dw2": null,
        }];
        return records;
    };
    records = data();

    var style = ".kaka-grid__inline-lookup__dropdown-item {\n" +
        "    line-height: 40px;\n" +
        "    border-bottom: 1px solid #f2f2f2;\n" +
        "}\n" +
        ".kaka-grid__inline-lookup__dropdown-item--first {\n" +
        "    border-top: 1px solid #f2f2f2;\n" +
        "}\n" +
        ".dropdown-column-first {\n" +
        "    width: 100px;\n" +
        "    border-right: 1px solid #f2f2f2;\n" +
        "}\n" +
        ".dropdown-column-last {\n" +
        "    width: 100px;\n" +
        "    padding-left: 8px;\n" +
        "}";

    window.examples.push({
        key: "listgrid/customField",
        grid: grid,
        style: style,
        data: data,
    });
})();