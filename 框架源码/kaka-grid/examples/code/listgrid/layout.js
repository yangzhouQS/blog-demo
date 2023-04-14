(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            // 数组
            // layout: [[{
            //     caption: "ID",
            //     field: "id",
            //     width: 85,
            //     rowSpan: 2
            // }, {
            //     caption: "Name",
            //     colSpan: 2,
            //     field: function (rec) {
            //         return rec.fname + " " + rec.lname;
            //     }
            // }, {
            //     caption: "",
            //     width: 120,
            //     rowSpan: 2,
            //     style: {
            //         textAlign: "center",
            //         buttonBgColor: "#aaa",
            //     },
            //     columnType: new kakaGrid.columns.type.ButtonColumn({
            //         caption: "SHOW REC",
            //         linkButton: true,
            //     }),
            //     action: new kakaGrid.columns.action.ButtonAction({
            //         action: function(rec) {
            //             alert(JSON.stringify(rec));
            //         }
            //     })
            // }], [{
            //     field: "fname",
            //     caption: "First Name",
            //     width: 200,
            //     minWidth: 150,
            // }, {
            //     field: "lname",
            //     caption: "Last Name",
            //     width: 200,
            //     minWidth: 150,
            // }]],
            
            // 对象
            layout: {
                header: [[{
                    caption: "ID"
                }, {
                    caption: "Name",
                    colSpan: 2
                }]],
                body: [[{
                    caption: "ID",
                    field: "id",
                    width: 85,
                    rowSpan: 2
                }, {
                    caption: "Name",
                    colSpan: 2,
                    field: function (rec) {
                        return rec.fname + " " + rec.lname;
                    }
                }, {
                    caption: "",
                    width: 120,
                    rowSpan: 2,
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
                }], [{
                    field: "fname",
                    caption: "First Name",
                    width: 200,
                    minWidth: 150,
                }, {
                    field: "lname",
                    caption: "Last Name",
                    width: 200,
                    minWidth: 150,
                }]],
            },
            records: records,
        });
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
        key: "listgrid/layout",
        grid: grid,
        style: style,
        data: data,
    });
})();