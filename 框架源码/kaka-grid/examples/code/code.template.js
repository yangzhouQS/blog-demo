(function() {
    var records;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "check",
                caption: "",
                width: 50,
                columnType: "check",
                action: "check"
            }],
            records: records,
        });
        return grid;
    };

    var data = function() {
        var records = [];
        return records;
    };
    records = data();

    var style = "";

    window.examples.push({
        key: "groupName/itemName",
        grid: grid,
        style: style,
        data: data,
    });
})();