(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "Field1",
                caption: "Field 1",
                width: 200,
                columnType: "multilinetext",
                action: new kakaGrid.columns.action.InlineTextAreaEditor({
                }),
            }, {
                field: "Field2",
                caption: "Field 2",
                width: 200,
                columnType: "multilinetext",
                style: {
                    appearance: "lookup-button", // 显示为查找按钮
                    // appearance: "clear-button", // 显示为清空按钮
                },
                action: new kakaGrid.columns.action.InlineTextAreaEditor({
                    disableAction: false,
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    },
                }),
            }],
            records: records,
        });
        return grid;
    };

    var data = function() {
        var records = [{
            "Field1": "string value 1-1",
            "Field2": "string value 2-1",
        }, {
            "Field1": "string value 1\nstring value 1",
            "Field2": "string value 2\nstring value 2",
        }];
        return records;
    };
    records = data();

    var style = "";

    window.examples.push({
        key: "colunm_actions/InlineTextAreaEditor",
        grid: grid,
        style: style,
        data: data,
    });
})();