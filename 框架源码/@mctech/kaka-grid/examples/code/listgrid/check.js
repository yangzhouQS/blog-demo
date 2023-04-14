(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "no",
                caption: "no",
                width: 50,
            }, {
                field: "check",
                caption: "",
                width: 100,
                contentHidden: false,
                columnType: new kakaGrid.columns.type.CheckColumn({
                    hidden: function(rec) {
                        return false;
                    },
                    // draw: function(value, ctx, opt) {
                    //     ctx.save()
                    //     try {
                    //         // opt.grid
                    //         // opt.record
                    //         // opt.row
                    //         // opt.col
                    //         // opt.selection
                    //         var x = opt.rect.left
                    //         var y = opt.rect.top
                    //         ctx.fillStyle = "#000"
                    //         ctx.fillText('合计', x, y)
                    //     } finally {
                    //         ctx.restore()
                    //     }
                    //     return false
                    // }
                }),
                action: "check",
                style: function(rec) {
                    return rec.customStyle ? {
                        borderColor: "#f0f",
                        checkBgColor: "#303",
                        uncheckBgColor: "#a0a",
                    } : undefined;
                },
                headerType: "check",
                headerAction: "check",
            }, {
                field: "switch",
                caption: "",
                width: 100,
                style: function(rec) {
                    return rec.customStyle ? {
                        borderColor: "#f0f",
                        checkBgColor: "#303",
                        uncheckBgColor: "#a0a",
                    } : undefined;
                },
                columnType: "switch",
                action: "switch",
                headerType: "switch",
                headerAction: "switch",
                headerStyle: function(rec) {
                    return rec.switch ? {
                        borderColor: "#f0f",
                        checkBgColor: "#303",
                        uncheckBgColor: "#a0a",
                    } : undefined;
                },
            }, {
                field: "radio",
                caption: "radio",
                width: 100,
                style: function(rec) {
                    return rec.customStyle ? {
                        checkBgColor: "#303",
                        uncheckBgColor: "#a0a",
                        checkColor: "f0f",
                        uncheckBorderColor: "#000",
                        checkBorderColor: "#000",
                    } : undefined;
                },
                columnType: "radio",
                action: new kakaGrid.columns.action.RadioEditor({
                    group: function(e) {
                        var grid = e.grid;
                        var row = e.row;
                        var col = e.col;

                        var group = grid.getRowRecord(row).group;
                        
                        var result = [];
                        for (
                            var targetRow = grid.frozenRowCount;
                            targetRow < grid.rowCount;
                            targetRow += grid.recordRowCount
                        ) {
                            if (grid.getRowRecord(targetRow).group === group) {
                                result.push({
                                    col: col,
                                    row: targetRow,
                                });
                            }
                        }
                        return result;
                    }
                })
            }, {
                field: "text",
                caption: "text",
                width: 120,
                headerIcon: {
                    svg: function() {
                        var color = "red";
                        return "<svg class='icon' width='16px' height='16px' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z' fill='" + color + "'/></svg>";
                    },
                    width: 16,
                },
            }, {
                width: 120,
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    caption: "SHOW REC",
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }],
            records: records,
        });

        grid.listen(kakaGrid.ListGrid.EVENT_TYPE.CHANGED_HEADER_VALUE, function(data) {
            var value = data.value;
            var field = data.field;

            if (field !== "check" && field !== "switch") {
                return;
            }
            // header check value on change
            
            for (var i = 0; i < grid.records.length; i++) {
                var rec = grid.records[i];
                rec[field] = value;
            }
            grid.invalidate();
        });
        grid.listen(kakaGrid.ListGrid.EVENT_TYPE.CHANGED_VALUE, function(data) {
            var field = data.field;

            if (field !== "check" && field !== "switch") {
                return;
            }
            // check value on change
        
            grid.headerValues.set(field, false);
        
            grid.invalidate();
        });

        return grid;
    };

    var data = function() {
        var records = [{
            "no": 0,
            "check": true,
            "switch": true,
            "radio": true,
            "group": 0,
            "text": "abc",
        }, {
            "no": 1,
            "check": false,
            "switch": false,
            "radio": false,
            "group": 0,
            "text": "def",
        }, {
            "no": 2,
            "check": true,
            "switch": true,
            "radio": true,
            "group": 1,
            "text": "ghi",
            "customStyle": true,
        }, {
            "no": 3,
            "check": false,
            "switch": false,
            "radio": false,
            "group": 1,
            "text": "ghi",
            "customStyle": true,
        }];
        return records;
    };
    records = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}";

    window.examples.push({
        key: "listgrid/check",
        grid: grid,
        style: style,
        data: data,
    });
})();