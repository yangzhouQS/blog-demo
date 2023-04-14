(function () {
    var iconFile = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16">' +
    '<path d="M13.18,1H2.74C1.16,1,1.02,2.83,1.02,2.83s0,9.48,0,10.56S2.74,15,2.74,15h7.74l4.49-4.43c0,0,0-6.53,0-7.89' +
        'C14.98,1.33,13.18,1,13.18,1z M13.89,10.14c0,0.55-0.58,0.58-0.58,0.58s-1.33,0-1.98,0c-0.65,0-0.64,0.49-0.64,0.49s0,1.27,0,1.97' +
        'c0,0.69-0.35,0.73-0.35,0.73s-6.53,0-7.33,0s-0.88-0.68-0.88-0.68s0-9.25,0-10.14S3,2.03,3,2.03s9.06,0.05,9.89,0.05c0.83,0,1,1,1,1' +
        'S13.89,9.58,13.89,10.14z"/>' +
        '<path d="M11.79,5.84c0,0.3-0.24,0.54-0.54,0.54H4.69c-0.3,0-0.54-0.24-0.54-0.54l0,0c0-0.3,0.24-0.54,0.54-0.54h6.56' +
        'C11.55,5.3,11.79,5.54,11.79,5.84L11.79,5.84z"/>' +
        '<path d="M10.64,8.6c0,0.29-0.24,0.53-0.53,0.53H4.68c-0.29,0-0.53-0.24-0.53-0.53l0,0c0-0.29,0.24-0.53,0.53-0.53h5.43' +
    'C10.4,8.07,10.64,8.31,10.64,8.6L10.64,8.6z"/>' +
    '</svg>';
    var iconFolder = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16">' +
    '<path fill="#CE9F06" d="M15.88,12.52H0V2.99h14.69c0.65,0,1.18,0.53,1.18,1.19L15.88,12.52L15.88,12.52L15.88,12.52z M9.92,2.99 C9.92,1.89,9.03,1,7.94,1H0v1.99H9.92"/>' +
    '<path fill="#FFFFFF" d="M1.98,9.86V3.89h11.91v5.97H1.98z"/>' +
    '<path fill="#FFCD2C" d="M15.88,13.78V6.05c0-0.55-0.45-0.99-0.99-0.99H0.99C0.45,5.06,0,5.5,0,6.05v7.72C0,14.45,0.55,15,1.22,15h13.43 C15.33,15,15.88,14.45,15.88,13.78z"/>' +
    '</svg>';
    var treeRecords;

    var grid = function () {
        var cachedDataSource = kakaGrid.data.CachedDataSource.ofArray(treeRecords);
        var treeDataSource = new kakaGrid.data.TreeDataSource(cachedDataSource, {
            keyField: "id",
            parentKeyField: "parentId",
            expandedKeys: [],
        });
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "name",
                caption: "名称",
                width: 280,
                columnType: "tree",
                icon: {
                    svg: function (rec) {
                        return rec.parentId ? iconFile : iconFolder;
                    },
                    width: 16,
                },
                style: function (rec) {
                    if (rec.parentId === null) {
                        return {
                            padding: [0, 0, 0, 0],
                            appearance: function(active) {
                                if (rec.id !== 1) {
                                    return {
                                        color: "#008cd6",
                                        path: "M8.7,3.6L4.8,7.5L3.3,6C3.2,5.8,3,5.8,2.8,5.9C2.6,6,2.5,6.3,2.6,6.4c0,0.1,0.1,0.1,0.1,0.1l1.8,1.8c0.2,0.1,0.4,0.1,0.5,0l4.2-4.2c0.1-0.2,0-0.4-0.1-0.5C9,3.6,8.8,3.6,8.7,3.6L8.7,3.6zM6,0C2.7,0,0,2.7,0,6s2.7,6,6,6s6-2.7,6-6S9.3,0,6,0z M6,11.2c-2.9,0-5.2-2.3-5.2-5.2S3.1,0.8,6,0.8s5.2,2.3,5.2,5.2l0,0C11.2,8.9,8.9,11.2,6,11.2C6,11.2,6,11.2,6,11.2z",
                                        width: 12,
                                    };
                                } else {
                                    return {
                                        color: "#008cd6",
                                        path: "M7.1,0H2.7C2.1,0,1.5,0.6,1.5,1.2v9.6C1.5,11.4,2,12,2.6,12h6.8c0.6,0,1.1-0.6,1.1-1.2V3.6L7.1,0z M6.6,4.1V0.9l3.1,3.3H6.6z",
                                        width: 12,
                                    };
                                }
                            }
                        };
                    } else {
                        return;
                    }
                }
            }, {
                field: "action",
                caption: "动作",
                width: 34,
                maxWidth: 34,
                minWidth: 34,
                style: function (rec) {
                    if (rec.parentId === null) {
                        return {
                            appearance: function(active) {
                                return {
                                    color: "rgba(0, 0, 0, .54)",
                                    path: "M5.2,10.8c0,0.7,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2c0,0,0,0,0,0c0-0.7-0.5-1.2-1.2-1.2C5.7,9.6,5.2,10.1,5.2,10.8z M5.2,1.2c0,0.7,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2c0,0,0,0,0,0C7.6,0.5,7,0,6.4,0C5.7,0,5.2,0.5,5.2,1.2z M5.2,6c0,0.7,0.5,1.2,1.2,1.2S7.6,6.7,7.6,6c0,0,0,0,0,0c0-0.7-0.5-1.2-1.2-1.2C5.7,4.8,5.2,5.3,5.2,6z",
                                    width: 12,
                                };
                            }
                        };
                    } else {
                        return;
                    }
                },
                action: new kakaGrid.columns.action.InlineMenuEditor({
                    autoWidth: true,
                    options: function (rec) {
                        if (rec.id === 1) {
                            return [{
                                value: 1,
                                classList: "stars1",
                                html: "<i>下载模版</i>"
                            }, {
                                value: 2,
                                classList: "stars1",
                                html: "<i>上传模版</i>"
                            }];
                        } else {
                            return [{
                                value: 1,
                                classList: "stars1",
                                html: "<i>下载模版</i>"
                            }];
                        }
                    }
                })
            }],
            disabled: function (rec) {
                return rec.parentId !== null;
            },
            hiddenHeader: true,
            defaultRowHeight: 32,
            dataSource: treeDataSource,
            singleSelection: true,
            theme: {
                borderColor: function (args) {
                    var rec = args.grid.getRowRecord(args.row);
                    var isRootRow = rec && rec.parentId === null;
                    if (args.grid.colCount - 1 === args.col && isRootRow) {
                        return ["#ccc7c7", null, "#ccc7c7", "#ccc7c7"];
                    } else {
                        return ["#ccc7c7", null];
                    }
                },
                defaultBgColor: function (args) {
                    var rec = args.grid.getRowRecord(args.row);
                    if (rec && rec.selected) {
                        return "#FDD";
                    }
                },
                highlightBorderColor: "transparent",
                tree: {
                    lineColor: "#CCC",
                    buttonColor: "#FFF",
                    buttonBgColor: "#CCC",
                    buttonBorderColor: "#CCC"
                }
            }
        });

        grid.dataSource.expandAll(); // 展开全部

        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CHANGED_VALUE, function(e) {
            if (e.value === 1) {
                alert("下载模版");
            } else if (e.value === 2) {
                alert("上传模版");
            }
            delete e.record.action;
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.SELECTED_CELL, function(e, selected) {
            if (selected) {
                var r = grid.getRowRecord(e.row);
                for (var i = 0; i < treeRecords.length; i++) {
                    var record = treeRecords[i];
                    record.selected = record === r;
                }
            }
        });

        return grid;
    };

    var data = function () {
        var treeRecords = [
            { id: 1, parentId: null, name: "汇聚表" },
            { id: 2, parentId: null, name: "事实表" },
            { id: 3, parentId: null, name: "维度表" },
            { id: 4, parentId: null, name: "桥接表" },
            { id: 5, parentId: null, name: "字段模版" },

            { id: 1001, parentId: 1, name: "基础算量表" },
            { id: 1002, parentId: 1, name: "形象进度工点日统计" },

            { id: 2001, parentId: 2, name: "施工记录材料" },
            { id: 2002, parentId: 2, name: "施工记录形象进度项" },
            { id: 2003, parentId: 2, name: "年计划产值" },
            { id: 2004, parentId: 2, name: "年计划形象进度" },
            { id: 2005, parentId: 2, name: "月计划产值" },
            { id: 2006, parentId: 2, name: "月计划形象进度" },

            { id: 3001, parentId: 3, name: "产品" },
            { id: 3002, parentId: 3, name: "统计周期" },
            { id: 3003, parentId: 3, name: "组织机构" },
            { id: 3004, parentId: 3, name: "用户" },

            { id: 4001, parentId: 4, name: "组织关系" },
        ].map(function(r) {
            r.name = "  " + r.name;
            return r;
        });
        return treeRecords;
    };
    treeRecords = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}\n" +
        ".kaka-grid .kaka-grid__inline-menu--hidden {\n" +
        "    transition: none;\n" +
        "}\n" +
        ".kaka-grid .kaka-grid__inline-menu--shown {\n" +
        "    transition: none;\n" +
        "}";

    window.examples.push({
        key: "listgrid/folderTree",
        grid: grid,
        style: style,
        data: data,
    });
})();

