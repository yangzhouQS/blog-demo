(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "id",
                caption: "ID",
                width: 40,
                style: { textAlign: "center" },
                headerStyle: { textAlign: "center" },
            }, {
                field: "value",
                caption: "Value",
                width: 200,
                headerStyle: { textAlign: "center" },
                action: new kakaGrid.columns.action.InlineInputEditor({
                    type: "text"
                }),
            }],
            records: records,
        });
        var printChangedLog = function(name, obj) {
            console.log(name);
            console.log(obj);
        };
        var valueCol = grid.getColumnIndexByField("value");
        var valueRepeatingCache;
        var valueRepeatingMin;
        var valueRepeatingMax;
        var rowIndexToRecordIndex = function(row) {
            return row - grid.frozenRowCount;
        };
        var rangeEach = function(fromRow, toRow, callback) {
            if (fromRow > toRow) {
                for (var i = fromRow; i >= toRow; i--) {
                    callback(rowIndexToRecordIndex(i));
                }
            } else {
                for (var j = fromRow; j <= toRow; j++) {
                    callback(rowIndexToRecordIndex(j));
                }
            }
        };
        var valueToPrefixValue = function(value) {
            value = value || "";
            var match = value.match(/(-?\d+)(\.\d+)?$/); // 匹配末尾浮点数
            var val = "";
            if (match && match.length > 0) {
                match.forEach(function(v) {
                    if ((v || "").length > val.length) {
                        val = v;
                    }
                });
            }
            var r = {
                prefix: value.substring(0, value.length - val.length),
                value: val ? parseFloat(val) : undefined,
            };
            return r;
        };
        var getRepeatRule = function(startRow, endRow, isUp, rowCount) {
            var values = grid.records.filter(function(record, index) {
                return index >= rowIndexToRecordIndex(startRow) && index <= rowIndexToRecordIndex(endRow);
            }).map(function(record) {
                return record.value;
            });
            var from;
            var to;
            if (isUp) {
                values = values.reverse();
                from = startRow - 1;
                to = startRow - rowCount;
            } else {
                from = endRow + 1;
                to = endRow + rowCount;
            }
            var prefixValues = values.map(function(value) {
                return valueToPrefixValue(value);
            });
            var isReplace = false;
            var stepValue;
            prefixValues.reduce(function(pv, v) {
                if (typeof pv.value === "number" && typeof v.value === "number") {
                    if (stepValue === undefined) {
                        stepValue = v.value - pv.value;
                    } else if (stepValue !== v.value - pv.value) {
                        isReplace = true;
                    }
                    if (pv.prefix !== v.prefix) {
                        isReplace = true;
                    }
                } else {
                    isReplace = true;
                }
                return v;
            });
            var lastPrefixValue = prefixValues[prefixValues.length - 1];
            var value = lastPrefixValue.value;
            if (value === undefined) {
                isReplace = true;
            }
            if (stepValue === undefined) {
                stepValue = isUp ? -1 : 1;
            }
            var prefix = lastPrefixValue.prefix;
            return {
                isReplace: isReplace,
    
                from: from,
                to: to,
    
                values: values,
    
                prefix: prefix,
                stepValue: stepValue,
                startValue: value,
            };
        };
        var valueRepeating = function(startRow, endRow, isUp, rowCount) {
            var records = grid.records;
            if (!valueRepeatingCache) {
                valueRepeatingCache = records.map(function(record) {
                    return record.value;
                });
            } else if (valueRepeatingMin !== undefined && valueRepeatingMax !== undefined) {
                var values = valueRepeatingCache;
                rangeEach(valueRepeatingMin, valueRepeatingMax, function(index) {
                    records[index].value = values[index];
                });
            }
            if (isUp !== undefined && rowCount !== undefined) {
                var rule = getRepeatRule(startRow, endRow, isUp, rowCount);
                if (rule.isReplace) {
                    var i = 0;
                    rangeEach(rule.from, rule.to, function(index) {
                        if (i >= rule.values.length) {
                            i = 0;
                        }
                        records[index].value = rule.values[i];
                        i++;
                    });
                } else {
                    var v = rule.startValue;
                    rangeEach(rule.from, rule.to, function(index) {
                        v += rule.stepValue;
                        records[index].value = rule.prefix + v;
                    });
                }
                var minRow = valueRepeatingMin === undefined ?
                    Math.min(rule.from, rule.to) :
                    Math.min(valueRepeatingMin, Math.min(rule.from, rule.to));
                valueRepeatingMin = minRow;
                var maxRow = valueRepeatingMax === undefined ?
                    Math.max(rule.from, rule.to) :
                    Math.max(valueRepeatingMax, Math.max(rule.from, rule.to));
                valueRepeatingMax = maxRow;
                grid.invalidateGridRect(valueCol, minRow, valueCol, maxRow);
            } else if (valueRepeatingMin !== undefined && valueRepeatingMax !== undefined) {
                grid.invalidateGridRect(valueCol, valueRepeatingMin, valueCol, valueRepeatingMax);
            }
        };
        var valueRepeat = function(startRow, endRow, isUp, rowCount) {
            valueRepeatingCache = undefined;
            valueRepeatingMin = undefined;
            valueRepeatingMax = undefined;
            if (isUp !== undefined && rowCount !== undefined) {
                var records = grid.records;
                var rule = getRepeatRule(startRow, endRow, isUp, rowCount);
                var autoFillValues = [];
                rangeEach(rule.from, rule.to, function(index) {
                    var record = records[index];
                    autoFillValues.push({
                        id: record.id,
                        value: record.value,
                    });
                });
                printChangedLog("拖动填充", autoFillValues);
            }
        };
        var clearSelectionValues = function() {
            var range = grid.selection.range;
            if (valueCol >= range.start.col && valueCol <= range.end.col) {
                var records = grid.records;
                var clearValues = [];
                rangeEach(range.start.row, range.end.row, function(index) {
                    var record = records[index];
                    record.value = "";
                    clearValues.push({
                        id: record.id,
                        value: record.value,
                    });
                });
                grid.invalidateGridRect(valueCol, range.start.row, valueCol, range.end.row);
                printChangedLog("清除数据", clearValues);
            }
        };
        grid.selectCellRange( // 默认选中两行
            valueCol, grid.frozenRowCount,
            valueCol, grid.frozenRowCount + 1
        );
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CAN_DRAG_SELECTION, function(range) {
            // 返回是否允许拖动选择区域
            return range.start.row >= grid.frozenRowCount &&
                range.start.col === range.end.col && range.end.col === valueCol;
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.DRAG_SELECTION, function(data) {
            // data.dragDone true:拖动完成 false:拖动中
            // data.oldRange 拖动前的区域
            // data.newRange 拖动完成区域
            if (data.dragDone) {
                // 拖动完成
                if (data.newRange.end.row > data.oldRange.end.row) {
                    // 向下
                    valueRepeat(data.oldRange.start.row, data.oldRange.end.row, false,
                        data.newRange.end.row - data.oldRange.end.row);
                } else if (data.newRange.start.row < data.oldRange.start.row) {
                    // 向上
                    valueRepeat(data.oldRange.start.row, data.oldRange.end.row, true,
                        data.oldRange.start.row - data.newRange.start.row);
                } else {
                    // 还原
                    valueRepeat(data.oldRange.start.row, data.oldRange.end.row);
                }
            } else {
                // 拖动中
                if (data.newRange.start.row < grid.frozenRowCount ||
                    data.newRange.start.col !== data.newRange.end.col ||
                    data.newRange.end.col !== valueCol) {
                    // 返回 false 表示目标区域无效
                    return false;
                } else if (data.newRange.end.row > data.oldRange.end.row) {
                    // 向下
                    valueRepeating(data.oldRange.start.row, data.oldRange.end.row, false,
                        data.newRange.end.row - data.oldRange.end.row);
                } else if (data.newRange.start.row < data.oldRange.start.row) {
                    // 向上
                    valueRepeating(data.oldRange.start.row, data.oldRange.end.row, true,
                        data.oldRange.start.row - data.newRange.start.row);
                } else {
                    // 还原
                    valueRepeating(data.oldRange.start.row, data.oldRange.end.row);
                }
            }
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CHANGED_VALUE, function(data) {
            // 修改
            printChangedLog("修改数据", [{
                id: data.record.id,
                value: data.record.value,
            }]);
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.PASTE, function(data) {
            // 粘贴
            var values = (data || "").split(/\r\n|\r|\n/);
            var range = grid.selection.range;
            if (valueCol >= range.start.col && valueCol <= range.end.col) {
                var records = grid.records;
                var startRow = range.start.row;
                var endRow = range.end.row;
                var pasteValues = [];
                var i = 0;
                if (startRow === endRow) {
                    endRow = Math.min(grid.rowCount - 1, startRow + values.length - 1);
                    rangeEach(startRow, endRow, function(index) {
                        var record = records[index];
                        record.value = values[i];
                        pasteValues.push({
                            id: record.id,
                            value: record.value,
                        });
                        i++;
                    });
                    grid.selectCellRange(valueCol, startRow, valueCol, endRow);
                } else {
                    rangeEach(startRow, endRow, function(index) {
                        if (i >= values.length) {
                            i = 0;
                        }
                        var record = records[index];
                        record.value = values[i];
                        pasteValues.push({
                            id: record.id,
                            value: record.value,
                        });
                        i++;
                    });
                }
                grid.invalidateGridRect(valueCol, startRow, valueCol, endRow);
                printChangedLog("粘贴数据", pasteValues);
            }
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CUT, function(e) {
            // 剪切
            clearSelectionValues();
            e.stopPropagation();
            e.preventDefault();
        });
        grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.KEYDOWN, function(e) {
            if (e.keyCode === 8) {
                // 删除
                clearSelectionValues();
                e.event.stopPropagation();
                e.event.preventDefault();
            } else if ((e.event.ctrlKey || e.event.metaKey) && e.keyCode === 65) {
                // 全选
                if (grid.records.length > 0) {
                    grid.selectCellRange(valueCol, grid.frozenRowCount, valueCol, grid.rowCount - 1);
                    e.event.stopPropagation();
                    e.event.preventDefault();
                }
            }
        });
        return grid;
    };

    var data = function() {
        var records = [];
        for (var i = 1; i <= 20; i++) {
            records.push({
                id: i,
                value: i > 2 ? "" : "Value" + i,
            });
        }
        return records;
    };
    records = data();

    var style = "";

    window.examples.push({
        key: "sample/autoFill",
        grid: grid,
        style: style,
        data: data,
    });
})();