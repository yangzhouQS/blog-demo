(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                caption: "font icon",
                width: 120,
                icon: {
                    font: "normal normal normal 16px/1 'Font Awesome 5 Free'",
                    content: "iconContent",
                    width: 16,
                },
                field: "field1",
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec, null, "  "));
                    },
                }),
            }, {
                caption: "class icon",
                width: 120,
                icon: {
                    className: "iconClassName",
                    width: 16,
                    color: function(rec) {
                        return rec.bool ? "#f0f" : "#0f0";
                    }
                },
                field: "field2",
            }, {
                caption: "src icon",
                width: 120,
                icon: {
                    src: "iconSrc",
                    width: 16,
                },
                field: "field3",
            }, {
                caption: "svg icon",
                width: 120,
                icon: {
                    svg: function(rec) {
                        var color = rec.bool ? "#0ff" : "#ff0";
                        return "<svg class='icon' width='16px' height='16px' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z' fill='" + color + "'/></svg>";
                    },
                    width: 16,
                },
                field: "field3",
            }, {
                caption: "svg icons",
                width: 120,
                icon: {
                    svg: ["<svg class='icon' width='16px' height='16px' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z' /></svg>",
                        "<svg class='icon' width='16px' height='16px' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z' /></svg>"],
                    width: 16,
                },
                field: "field3",
            }, {
                caption: "svg button",
                width: 120,
                icon: {
                    svg: function(rec) {
                        var w = "60px";
                        var h = "30px";
                        var text = "state" + rec.field4;
                        var bgColor = "#f0f";
                        var color = "#ff0";
                        return "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='" + w + "' height='" + h + "' viewBox='0 0 32 16'><rect x='0' y='0' rx='3' ry='3' width='32' height='16' fill='" + bgColor + "'/><text x='16' y='8' text-anchor='middle' dy='.3em' fill='" + color + "' style='font-size:10px'>" + text + "</text></svg>";
                    },
                },
                style: {
                    textAlign: "center",
                },
            }, {
                caption: "button",
                field: function(rec) {
                    return "state" + rec.field4;
                },
                width: 120,
                columnType: new kakaGrid.columns.type.ButtonColumn({
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    },
                    disabled: function(rec) {
                        return false;
                    }
                }),
                style: function(rec) {
                    return {
                        padding: [4, 20],
                        buttonBgColor: "#f0f",
                        color: "ff0",
                    };
                },
            }],
            records: records,
        });
        return grid;
    };

    var data = function() {
        var records = [{
            "field1": "file",
            "field2": "file",
            "field3": "file",
            "field4": "1",
            "iconContent": "\uf15b",
            "iconClassName": "fas fa-file",
            "iconSrc": "./img/file.png",
            "bool": true,
        }, {
            "field1": "audio",
            "field2": "audio",
            "field3": "audio",
            "field4": "2",
            "iconContent": "\uf1c7",
            "iconClassName": "fas fa-file-audio",
            "iconSrc": "./img/file-audio.png",
            "bool": false,
        }, {
            "field1": "code",
            "field2": "code",
            "field3": "code",
            "field4": "3",
            "iconContent": "\uf1c9",
            "iconClassName": "fas fa-file-code",
            "iconSrc": "./img/file-code.png",
            "bool": false,
        }, {
            "field1": "image",
            "field2": "image",
            "field3": "image",
            "field4": "4",
            "iconContent": "\uf1c5",
            "iconClassName": "fas fa-file-image",
            "iconSrc": "./img/file-image.png",
            "bool": false,
        }];
        return records;
    };
    records = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}";

    window.examples.push({
        key: "listgrid/icon",
        grid: grid,
        style: style,
        data: data,
    });
})();