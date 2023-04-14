(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                caption: "ID",
                field: "id",
                width: 85,
            }, {
                caption: "Name",
                columns: [{
                    field: "fname",
                    caption: "First Name",
                    width: 200,
                    minWidth: 150,
                }, {
                    field: "lname",
                    caption: "Last Name",
                    width: 200,
                    minWidth: 150,
                }]
            }, {
                caption: "",
                width: 120,
                style: {
                    textAlign: "center",
                    buttonBgColor: "#aaa",
                },
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    caption: "SHOW REC",
                    linkButton: true,
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }],
            records: records,
        });
        // // 单击单元格
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CLICK_CELL, function(e) {
        //     // e.col 列索引
        //     // e.row 行索引
        //     // e.event 原始事件
        //     console.log("EVENT_TYPE.CLICK_CELL");
        //     // console.debug(arguments);
        // });
        // // 单击空白处
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CLICK_UNDERLAY, function() {
        //     console.log("EVENT_TYPE.CLICK_UNDERLAY");
        //     // console.debug(arguments);
        // });
        // // 双击单元格
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.DBLCLICK_CELL, function(e) {
        //     // e.col 列索引
        //     // e.row 行索引
        //     // e.event 原始事件
        //     console.log("EVENT_TYPE.DBLCLICK_CELL");
        //     // console.debug(arguments);
        // });
        // // 双击空白处
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.DBLCLICK_UNDERLAY, function() {
        //     console.log("EVENT_TYPE.DBLCLICK_UNDERLAY");
        //     // console.debug(arguments);
        // });
        // // 轻击两下单元格
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.DBLTAP_CELL, function(e) {
        //     // e.col 列索引
        //     // e.row 行索引
        //     // e.event 原始事件
        //     console.log("EVENT_TYPE.DBLTAP_CELL");
        //     // console.debug(arguments);
        // });
        // // 轻击两下空白处
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.DBLTAP_UNDERLAY, function() {
        //     console.log("EVENT_TYPE.DBLTAP_UNDERLAY");
        //     // console.debug(arguments);
        // });
        // // 鼠标按下
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.MOUSEDOWN_CELL, function(e) {
        //     // e.col 列索引
        //     // e.row 行索引
        //     // e.event 原始事件
        //     console.log("EVENT_TYPE.EDITABLEINPUT_CELL");
        //     // console.debug(arguments);
        // });
        
        // TODO:
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.EDITABLEINPUT_CELL, function() {
        //     console.log("EVENT_TYPE.EDITABLEINPUT_CELL");
        //     console.debug(arguments);
        // });
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.INPUT_CELL, function() {
        //     console.log("EVENT_TYPE.INPUT_CELL");
        //     console.debug(arguments);
        // });
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.KEYDOWN, function() {
        //     console.log("EVENT_TYPE.KEYDOWN");
        //     console.debug(arguments);
        // });
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.MODIFY_STATUS_EDITABLEINPUT_CELL, function() {
        //     console.log("EVENT_TYPE.MODIFY_STATUS_EDITABLEINPUT_CELL");
        //     console.debug(arguments);
        // });
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.RESIZE_COLUMN, function() {
        //     console.log("EVENT_TYPE.RESIZE_COLUMN");
        //     console.debug(arguments);
        // });
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.SCROLL, function() {
        //     console.log("EVENT_TYPE.SCROLL");
        //     console.debug(arguments);
        // });
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.SELECTED_CELL, function() {
        //     console.log("EVENT_TYPE.SELECTED_CELL");
        //     console.debug(arguments);
        // });
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CHANGED_VALUE, function() {
        //     console.log("EVENT_TYPE.CHANGED_VALUE");
        //     console.debug(arguments);
        // });
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.COPY, function() {
        //     console.log("EVENT_TYPE.COPY");
        //     console.debug(arguments);
        // });
        // grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CUT, function() {
        //     console.log("EVENT_TYPE.CUT");
        //     console.debug(arguments);
        // });
        return grid;
    };

    var data = function() {
        var records = [{
            "id": 1,
            "fname": "Sophia",
            "lname": "Smith",
        }, {
            "id": 2,
            "fname": "Emma",
            "lname": "Ortiz",
        }, {
            "id": 3,
            "fname": "Isabella",
            "lname": "Bennett",
        }, {
            "id": 4,
            "fname": "Mia",
            "lname": "Lee",
        }];
        return records;
    };
    records = data();

    var style = "";

    window.examples.push({
        key: "listgrid/event",
        grid: grid,
        style: style,
        data: data,
    });
})();