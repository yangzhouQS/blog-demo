(function() {
    var records;

    var grid = function() {
        var textFieldStyle = new kakaGrid.columns.style.Style();
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "personid",
                caption: "ID",
                width: 85,
                columnType: "number",
                action: new kakaGrid.columns.action.InlineInputEditor({
                    classList: "al-right",
                    type: "number",
                    readOnly: true, // 只读
                }),
                style: textFieldStyle,
            }, {
                caption: "Name",
                columns: [{
                    field: "fname",
                    caption: "First Name",
                    width: "20%",
                    minWidth: 150,
                    action: new kakaGrid.columns.action.InlineInputEditor({
                        readOnly: function(rec) { // 条件只读【推荐】
                            return rec.fname === "readOnly";
                        }
                    }),
                    style: function(rec) {
                        // 单元格样式
                        return {
                            color: rec.fname === "readOnly" ? "gray" : undefined,
                        };
                    }
                }, {
                    field: "lname",
                    caption: "Last Name",
                    width: "20%",
                    minWidth: 150,
                    action: new kakaGrid.columns.action.InlineInputEditor({
                        readOnly: function(rec) { // 条件只读【推荐】
                            return rec.lname === "readOnly";
                        }
                    }),
                    style: function(rec) {
                        // 单元格样式
                        return {
                            bgColor: rec.lname === "readOnly" ? "gray" : undefined,
                        };
                    }
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

        // 【不推荐使用】单元格只读：在选择单元格时，设置列动作的只读属性
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.SELECTED_CELL, function(data, selected) {
        //     if (selected) {
        //         var record = grid.getRowRecord(data.row);
        //         var field = grid.getField(data.col);
        //         var colunm = grid.getColumn(data.col);
        //         if ((field === "fname" || field === "lname") && record) {
        //             // 设置列只读
        //             colunm.action.readOnly = record[field] === "readOnly";
        //         }
        //     }
        // });
        
        // 设置列样式
        textFieldStyle.bgColor = "gray";

        // 修改主题
        // grid.theme = kakaGrid.themes.default.extends({defaultBgColor: "gray"}); // 以默认主题为基础，修改默认背景色
        // grid.theme = null; // 还原为默认

        return grid;
    };

    var data = function() {
        var records = [{
            "personid": 0,
            "fname": "readOnly",
            "lname": "",
        }, {
            "personid": 1,
            "fname": "",
            "lname": "readOnly",
        }, {
            "personid": 2,
            "fname": "readOnly",
            "lname": "",
        }, {
            "personid": 3,
            "fname": "",
            "lname": "readOnly",
        }];
        return records;
    };
    records = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}";

    window.examples.push({
        key: "listgrid/readOnly",
        grid: grid,
        style: style,
        data: data,
    });
})();