(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "id",
                caption: "ID",
                tooltip: function(rec) {
                    return "ID列<br/>第二行";
                },
                tooltipType: "overflow-html",
                headerTooltip: "列头提示内容-ID",
                headerTooltipType: "overflow-text",
                width: 85,
            }, {
                caption: "Name",
                headerTooltip: "列头提示内容-Name", // 列头提示内容为：固定值
                columns: [{
                    field: "fname",
                    caption: "First Name",
                    tooltip: "tipContent", // 提示内容为：字段值
                    headerTooltip: "列头提示内容-First Name\n第二行", // 列头提示内容为：固定值
                    style: {
                        textOverflow: "clip", // 文本溢出时，截断；【默认值】
                    },
                    headerStyle: {
                        textOverflow: "clip", // 文本溢出时，截断
                    },
                    width: 40,
                    minWidth: 20,
                }, {
                    field: "lname",
                    caption: "Last Name",
                    tooltip: function(rec) { // 提示内容为：回调函数
                        return ""; // 返回空，表示使用默认
                    },
                    headerTooltip: function(header) {
                        // header.cell 为 { col: number; row: number }
                        // header.field 为 IField
                        return ""; // 返回空，表示使用默认
                    },
                    style: {
                        textOverflow: "ellipsis", // 文本溢出时，使用省略号；并由 tooltip 提示完整内容
                    },
                    headerStyle: {
                        textOverflow: "ellipsis", // 文本溢出时，使用省略号；并由 tooltip 提示完整内容；【默认值】
                    },
                    width: 40,
                    minWidth: 20,
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
        
        return grid;
    };

    var data = function() {
        var records = [{
            "id": 1,
            "fname": "La",
            "lname": "Inmaculada",
            "tipContent": "La Inmaculada",
        }, {
            "id": 2,
            "fname": "Emma",
            "lname": "Almudena",
            "tipContent": "Emma Almudena",
        }, {
            "id": 3,
            "fname": "Isabella",
            "lname": "Immanuel",
            "tipContent": "Isabella Immanuel",
        }, {
            "id": 4,
            "fname": "Mia",
            "lname": "Lee",
            "tipContent": "Mia Lee",
        }];
        return records;
    };
    records = data();

    var style = ".kaka-grid .kaka-grid__tooltip-element {\n" +
        "    color: #000;\n" +
        "    background-color: rgba(255, 255, 0, 0.7);\n" +
        "}\n" +
        ".kaka-grid .kaka-grid__tooltip-element__content {\n" +
        "    font-size: 24px;\n" +
        "}";

    window.examples.push({
        key: "listgrid/tooltip",
        grid: grid,
        style: style,
        data: data,
    });
})();