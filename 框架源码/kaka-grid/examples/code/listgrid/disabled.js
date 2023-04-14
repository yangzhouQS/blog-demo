(function() {
    var records;

    var grid = function() {
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
                    disabled: true, // 禁用
                }),
            }, {
                caption: "Name",
                columns: [{
                    field: "fname",
                    caption: "First Name",
                    width: "20%",
                    minWidth: 150,
                    action: new kakaGrid.columns.action.InlineInputEditor({
                        disabled: function(rec) { // 条件禁用【推荐】
                            return rec.fname === "disabled";
                        }
                    })
                }, {
                    field: "lname",
                    caption: "Last Name",
                    width: "20%",
                    minWidth: 150,
                    action: new kakaGrid.columns.action.InlineInputEditor({
                        disabled: function(rec) { // 条件禁用【推荐】
                            return rec.lname === "disabled";
                        }
                    })
                }]
            }, {
                field: "action",
                caption: "",
                width: 120,
                columnType: new kakaGrid.columns.type.ButtonColumn({
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    },
                    disabled: function(rec) { // 条件禁用【推荐】
                        return rec.action === "disabled";
                    }
                })
            }],
            records: records,
        });
        // 【不推荐使用】在选择单元格时，设置列动作的禁用属性
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.SELECTED_CELL, function(data, selected) {
        //     if (selected) {
        //         var record = grid.getRowRecord(data.row);
        //         var field = grid.getField(data.col);
        //         var colunm = grid.getColumn(data.col);
        //         if ((field === "fname" || field === "lname" || field === "action") && record) {
        //             colunm.action.disabled = record[field] === "disabled";
        //         }
        //     }
        // });
        return grid;
    };

    var data = function() {
        var records = [{
            "personid": 0,
            "fname": "disabled",
            "lname": "",
            "action": "SHOW REC",
        }, {
            "personid": 1,
            "fname": "",
            "lname": "disabled",
            "action": "disabled",
        }, {
            "personid": 2,
            "fname": "disabled",
            "lname": "",
            "action": "SHOW REC",
        }, {
            "personid": 3,
            "fname": "",
            "lname": "disabled",
            "action": "disabled",
        }];
        return records;
    };
    records = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}";

    window.examples.push({
        key: "listgrid/disabled",
        grid: grid,
        style: style,
        data: data,
    });
})();