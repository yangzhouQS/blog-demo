(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                caption: "自定义显示内容",
                field: "field1",
                columnType: new kakaGrid.columns.type.DrawColumn({
                    draw: function(value, context, info) {
                        // todo:
                    },
                }),
                style: {
                    appearance: "clear-button"
                },
                action: new kakaGrid.columns.action.InlineInputEditor({
                    disableInput: true,
                    disableAction: false,
                    action: function(rec, info) {
                        this.open(info.grid, info.cell);
                        console.log(info.grid.getCellRelativeRect(info.cell.col, info.cell.row));
                    },
                }),
                width: 150,
            }],
            records: records,
        });
        return grid;
    };

    var data = function() {
        var records = [{
            "field1": "string",
        }, {
            "field1": "number",
        }, {
            "field1": null,
        }];
        return records;
    };
    records = data();

    var style = "";

    window.examples.push({
        key: "listgrid/customDraw",
        grid: grid,
        style: style,
        data: data,
    });
})();