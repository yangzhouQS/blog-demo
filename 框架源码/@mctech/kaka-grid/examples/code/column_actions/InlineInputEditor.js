(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            keyboardOptions: {
                deleteCellValueOnDel: true,
                selectAllOnCtrlA: true,
                selectAllOptions: {
                    ctrlA: { // Ctrl + A
                        excludeFrozenRow: false, // 全选时是否排除锁定行(列头)
                        excludeFrozenCol: false, // 全选时是否排除锁定列
                    },
                    shiftCtrlA: { // Shift + Ctrl + A
                        excludeFrozenRow: true,
                        excludeFrozenCol: false,
                    }
                }
            },
            header: [{
                field: "StringField",
                caption: "String Field",
                width: "auto",
                disableResize: true,
                style: function(rec) {
                    // 如果当前记录、字段没有值，则字体为灰色
                    if (rec && !rec.StringField) {
                        return {
                            color: "#ddd"
                        }
                    }
                },
                columnType: new kakaGrid.columns.type.Column({
                    convert: function(value, displayValue, cell, grid) {
                        // 如果value没有值，则提示输入
                        if (!value) {
                            return "请输入字符串";
                        } else {
                            return displayValue;
                        }
                    },
                }),
                action: new kakaGrid.columns.action.InlineInputEditor({
                    type: "text"
                }),
            }, {
                field: "StringField2",
                caption: "String Field 2",
                width: "auto",
                disableResize: true,
                columnType: "default",
                action: new kakaGrid.columns.action.InlineInputEditor({
                    type: "text"
                }),
            }, {
                field: "NumberField",
                caption: "Number Field",
                width: 200,
                columnType: "number",
                action: new kakaGrid.columns.action.InlineInputEditor({
                    type: "number",
                    classList: ["al-right"],
                    enabledMouseWheel: true
                }),
            }, {
                field: "DateField",
                caption: "Date Field",
                width: 200,
                columnType: new kakaGrid.columns.type.DateColumn({
                    format: new Intl.DateTimeFormat("zh-CN", {
                        year: "numeric",
                        month: "numeric"
                    })
                }),
                style: {
                    appearance: function(active) { // 自定义图标
                        return {
                            color: active ? "rgba(0, 0, 0, .9)" : "rgba(0, 0, 0, .54)",
                            path: "M5.6,6.8h0.9c0.2,0,0.4-0.2,0.4-0.4C6.8,6.2,6.7,6,6.4,6c0,0,0,0,0,0H5.6C5.3,6,5.1,6.2,5.1,6.4c0,0,0,0,0,0C5.1,6.7,5.3,6.8,5.6,6.8L5.6,6.8z M5.6,8.6h0.9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H5.6c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C5.1,8.4,5.3,8.6,5.6,8.6L5.6,8.6z M10.3,0.9H8.6V0.4C8.6,0.2,8.4,0,8.1,0c0,0,0,0,0,0C7.9,0,7.7,0.2,7.7,0.4c0,0,0,0,0,0v0.4H4.3V0.4C4.3,0.2,4.1,0,3.9,0c0,0,0,0,0,0C3.6,0,3.4,0.2,3.4,0.4c0,0,0,0,0,0v0.4H1.7C0.8,0.9,0,1.6,0,2.6v6.8c0,0.9,0.8,1.7,1.7,1.7h8.6c0.9,0,1.7-0.8,1.7-1.7V2.6C12,1.6,11.2,0.9,10.3,0.9L10.3,0.9z M11.1,9.4c0,0.5-0.4,0.9-0.9,0.9H1.7c-0.5,0-0.9-0.4-0.9-0.9V4.3h10.3V9.4z M11.1,3.4H0.9V2.6c0-0.5,0.4-0.9,0.9-0.9h1.7v0.4c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4V1.7h3.4v0.4c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.2,0.4-0.4V1.7h1.7c0.5,0,0.9,0.4,0.9,0.9L11.1,3.4L11.1,3.4z M3,8.6h0.9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H3c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C2.6,8.4,2.8,8.6,3,8.6z M8.1,6.8H9c0.2,0,0.4-0.2,0.4-0.4C9.4,6.2,9.2,6,9,6c0,0,0,0,0,0H8.1C7.9,6,7.7,6.2,7.7,6.4c0,0,0,0,0,0C7.7,6.7,7.9,6.8,8.1,6.8L8.1,6.8z M3,6.8h0.9c0.2,0,0.4-0.2,0.4-0.4C4.3,6.2,4.1,6,3.9,6c0,0,0,0,0,0H3C2.8,6,2.6,6.2,2.6,6.4c0,0,0,0,0,0C2.6,6.7,2.8,6.8,3,6.8z M8.1,8.6H9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H8.1c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C7.7,8.4,7.9,8.6,8.1,8.6z",
                            width: 12,
                        };
                    },
                    // appearance: "date-button", // 固定图标：date-button lookup-button clear-button
                },
                action: new kakaGrid.columns.action.InlineInputEditor({
                    type: "date",
                    classList: ["al-right"],
                    disableInput: false, // 禁止输入，false(默认)、true、function(record, data) { reutrn false; }
                    disableAction: false, // 禁止动作，false(默认)、true、function(record, data) { reutrn false; }
                    action: function(rec, info) {
                        this.open(info.grid, info.cell);
                        console.log(info.grid.getCellRelativeRect(info.cell.col, info.cell.row));
                    },
                }),
            }],
            disableColumnResize: true,
            records: records,
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.PASTE, function(data) {
            console.log(data);
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CHANGED_VALUE, function(data) {
            console.log(data);
        });
        return grid;
    };

    var data = function() {
        var records = [{
            "StringField": "string value 1",
            "StringField2": "string value 1",
            "NumberField": 10,
            "DateField": new Date(),
            "BooleanField": false,
        }, {
            "StringField": "string value 2",
            "StringField2": "string value 2",
            "NumberField": -10,
            "DateField": new Date(),
            "BooleanField": true,
        }, {
            "StringField": "",
            "StringField2": "",
            "NumberField": 0.12,
            "DateField": new Date(),
            "BooleanField": true,
        }, {
            "StringField": null,
            "StringField2": null,
            "NumberField": null,
            "DateField": null,
            "BooleanField": null,
        }, {
            "StringField": undefined,
            "StringField2": undefined,
            "NumberField": undefined,
            "DateField": undefined,
            "BooleanField": undefined,
        }];
        return records;
    };
    records = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}";

    window.examples.push({
        key: "colunm_actions/InlineInputEditor",
        grid: grid,
        style: style,
        data: data,
    });
})();