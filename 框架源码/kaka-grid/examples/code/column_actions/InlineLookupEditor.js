(function() {
    var records;

    var grid = function() {
        var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
            if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
            return cooked;
        };
        var loadedLookupData = {};
        var getRecordsWithAjax = function(key) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var records = [{"id": null, "name": "Empty"}];
                    switch (key) {
                        case 0:
                            records = records.concat([{"id": 0, "name": "BeiJing"}, {"id": 1, "name": "ShangHai"}]);
                            break;
                        case 1:
                            records = records.concat([{"id": 10, "name": "Toronto"}, {"id": 11, "name": "Montreal"}]);
                            break;
                        case 2:
                            records = records.concat([{"id": 20, "name": "Chania"}, {"id": 21, "name": "Chios"}]);
                            break;
                        default:
                            break;
                    }
                    resolve(records);
                }, 500);
            });
        };
        var getLookupRecords = function(rec) {
            var key = typeof rec.Field1 === "number" ? rec.Field1 : -1;
            if (!loadedLookupData[key]) {
                if (key >= 0) {
                    loadedLookupData[key] = getRecordsWithAjax(key);
                } else {
                    loadedLookupData[key] = [{"id": null, "name": "Empty"}, {"id": -1, "name": "None"}];
                }
            }
            return loadedLookupData[key];
        };
        var lookupRecords = [{
            "id": null,
            "name": "Empty",
        }, {
            "id": 0,
            "name": "China",
        }, {
            "id": 1,
            "name": "Canada",
        }, {
            "id": 2,
            "name": "Greece",
        }];
        var lookupStringRecords = [{
            "name": "",
            "displayName": "Empty",
        }, {
            "name": "China",
            "displayName": "China",
        }, {
            "name": "Canada",
            "displayName": "Canada",
        }, {
            "name": "Greece",
            "displayName": "Greece",
        }];
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "Field1",
                caption: "不允许额外值",
                width: 200,
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupRecords,
                    valueField: "id",
                    captionField: "name",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupRecords,
                    valueField: "id",
                    valueType: "number", // 数据类型，支持 number 和 string，默认为：string
                    captionField: "name",
                    allowOtherInput: false, // 是否允许参照列表之外的数据录入，默认为：false
                    filterFields: ["name"], // 只使用 name 数据过滤
                }),
            }, {
                field: "Field2",
                caption: "允许额外值",
                width: 200,
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupRecords,
                    valueField: "id",
                    captionField: "name",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupRecords,
                    valueField: "id",
                    valueType: "number", // 数据类型，支持 number 和 string，默认为：string
                    captionField: "name",
                    allowOtherInput: true, // 是否允许参照列表之外的数据录入，默认为：false
                    filterFields: ["name"], // 只使用 name 数据过滤
                }),
            }, {
                field: "Field3",
                caption: "下拉多列",
                width: 200,
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupRecords,
                    valueField: "id",
                    captionField: "name",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupRecords,
                    valueField: "id",
                    valueType: "number", // 数据类型，支持 number 和 string，默认为：string
                    captionField: "name",
                    allowOtherInput: true, // 是否允许参照列表之外的数据录入，默认为：false
                    // dropdownTemplate: kakaGrid.template`<span class='dropdown-column-first'>${'id'}</span><span class='dropdown-column-last'>${'name'}</span>`,
                    dropdownTemplate: kakaGrid.template(__makeTemplateObject(["<span class='dropdown-column-first'>", "</span><span class='dropdown-column-last'>", "</span>"], ["<span class='dropdown-column-first'>", "</span><span class='dropdown-column-last'>", "</span>"]), "id", "name"),
                    // dropdownEmptyTemplate: kakaGrid.template`${'name'}`,
                    dropdownEmptyTemplate: kakaGrid.template(__makeTemplateObject(["", ""], ["", ""]), "name"),
                }),
            }, {
                field: "Field4",
                caption: "字符串不允许额外值",
                width: 200,
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupStringRecords,
                    valueField: "name",
                    captionField: "displayName",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupStringRecords,
                    valueField: "name",
                    captionField: "displayName",
                    allowOtherInput: false, // 是否允许参照列表之外的数据录入，默认为：false
                }),
            }, {
                field: "Field5",
                caption: "字符串允许额外值",
                width: 200,
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupStringRecords,
                    valueField: "name",
                    captionField: "displayName",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupStringRecords,
                    valueField: "name",
                    captionField: "displayName",
                    allowOtherInput: true, // 是否允许参照列表之外的数据录入，默认为：false
                }),
            }, {
                field: "Field6",
                caption: "字符串下拉多列",
                width: 200,
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupStringRecords,
                    valueField: "name",
                    captionField: "displayName",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupStringRecords,
                    valueField: "name",
                    valueType: "string", // 数据类型，支持 number 和 string，默认为：string
                    captionField: "displayName",
                    allowOtherInput: true, // 是否允许参照列表之外的数据录入，默认为：false
                    filterFields: ["name", "id"], // 使用 name 和 id 数据过滤
                    // dropdownTemplate: kakaGrid.template`<span class='dropdown-column-first'>${'name'}</span><span class='dropdown-column-last'>${'displayName'}</span>`,
                    dropdownTemplate: kakaGrid.template(__makeTemplateObject(["<span class='dropdown-column-first'>", "</span><span class='dropdown-column-last'>", "</span>"], ["<span class='dropdown-column-first'>", "</span><span class='dropdown-column-last'>", "</span>"]), "name", "displayName"),
                }),
            }, {
                field: "Field7",
                caption: "箭头隐藏",
                width: 200,
                style: function(rec) {
                    var bool = rec.Field7 !== null && rec.Field7 !== undefined;
                    return {
                        bgColor: bool ? "gray" : undefined,
                        appearance: bool ? "none" : "menulist-button", // 隐藏箭头
                    };
                },
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupRecords,
                    valueField: "id",
                    captionField: "name",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupRecords,
                    valueField: "id",
                    valueType: "number",
                    captionField: "name",
                    disableAction: function(rec) {
                        return rec.Field7 !== null && rec.Field7 !== undefined;
                    },
                }),
            }, {
                field: "Field8",
                caption: "动态过滤",
                width: 200,
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupRecords,
                    valueField: "id",
                    captionField: "name",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupRecords,
                    valueField: "id",
                    valueType: "number",
                    captionField: "name",
                    filter: function(lookupRecord, record) {
                        // 根据当前记录过滤下拉选项
                        return lookupRecord.id === null || record.Field7 === lookupRecord.id;
                    },
                }),
            }, {
                field: "Field9",
                caption: "不过滤、仅匹配",
                width: 200,
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupRecords,
                    valueField: "id",
                    captionField: "name",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupRecords,
                    valueField: "id",
                    valueType: "number",
                    captionField: "name",
                    disableFilterRecords: true, // 不过滤、仅匹配，并将匹配项排在前面
                    // disableFilterSort: true, // 禁止过滤排序，默认false
                }),
            }, {
                field: "Field10",
                caption: "弹出选择",
                width: 200,
                style: {
                    appearance: "lookup-button", // 显示为查找按钮
                    // appearance: "clear-button", // 显示为清空按钮
                },
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupRecords,
                    valueField: "id",
                    captionField: "name",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupRecords,
                    valueField: "id",
                    valueType: "number",
                    captionField: "name",
                    disableInput: false,
                    disableAction: false,
                    action: function(rec) {
                        // alert(JSON.stringify(rec))
                        console.log(JSON.stringify(rec));
                    },
                }),
            }, {
                field: "Field11",
                caption: "延迟加载",
                width: 200,
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: getLookupRecords,
                    valueField: "id",
                    captionField: "name",
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: getLookupRecords,
                    valueField: "id",
                    valueType: "number",
                    captionField: "name",
                }),
            }],
            records: records,
        });
        return grid;
    };

    var data = function() {
        var records = [{
            "Field1": -1,
            "Field2": -1,
            "Field3": -1,
            "Field4": "Other",
            "Field5": "Other",
            "Field6": "Other",
            "Field7": -1,
            "Field8": null,
            "Field9": null,
            "Field10": null,
            "Field11": null,
        }, {
            "Field1": 0,
            "Field2": 0,
            "Field3": 0,
            "Field4": "China",
            "Field5": "China",
            "Field6": "China",
            "Field7": 0,
            "Field8": null,
            "Field9": null,
            "Field10": null,
            "Field11": 1,
        }, {
            "Field1": 1,
            "Field2": 1,
            "Field3": 1,
            "Field4": "Canada",
            "Field5": "Canada",
            "Field6": "Canada",
            "Field7": 1,
            "Field8": null,
            "Field9": null,
            "Field10": null,
            "Field11": 10,
        }, {
            "Field1": 2,
            "Field2": 2,
            "Field3": 2,
            "Field4": "Greece",
            "Field5": "Greece",
            "Field6": "Greece",
            "Field7": 2,
            "Field8": null,
            "Field9": null,
            "Field10": null,
            "Field11": 20,
        }, {
            "Field1": null,
            "Field2": null,
            "Field3": null,
            "Field4": null,
            "Field5": null,
            "Field6": null,
            "Field7": null,
            "Field8": null,
            "Field9": null,
            "Field10": null,
            "Field11": null,
        }, {
            "Field1": undefined,
            "Field2": undefined,
            "Field3": undefined,
            "Field4": undefined,
            "Field5": undefined,
            "Field6": undefined,
            "Field7": undefined,
            "Field8": null,
            "Field9": null,
            "Field10": null,
            "Field11": null,
        }];
        return records;
    };
    records = data();

    var style = ".kaka-grid__inline-lookup__dropdown-item {\n" +
        "    height: 40px;\n" +
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
        key: "colunm_actions/InlineLookupEditor",
        grid: grid,
        style: style,
        data: data,
    });
})();