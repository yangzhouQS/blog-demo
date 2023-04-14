(function() {
    var list = [
        "sample/welcome.js",
        "sample/sample.js",
        "sample/autoFill.js",
        "sample/projectProgress.js",
        "sample/intelliQuantity.js",
        "sample/branchGraphColumn.js",
        "column_actions/InlineInputEditor.js",
        "column_actions/InlineLookupEditor.js",
        "column_actions/InlineTextAreaEditor.js",
        "listgrid/rowNumber.js",
        "listgrid/theme.js",
        "listgrid/event.js",
        "listgrid/icon.js",
        "listgrid/image.js",
        "listgrid/selected.js",
        "listgrid/dragSelection.js",
        "listgrid/sort.js",
        "listgrid/check.js",
        "listgrid/button.js",
        "listgrid/disabled.js",
        "listgrid/readOnly.js",
        "listgrid/customDraw.js",
        "listgrid/customField.js",
        "listgrid/tooltip.js",
        "listgrid/treegrid.js",
        "listgrid/treelazy.js",
        "listgrid/treeLookup.js",
        "listgrid/folderTree.js",
        "listgrid/layout.js",
        "listgrid/spanBody.js",
        "listgrid/cellStyle.js",
        "listgrid/message.js",
        "listgrid/promiseRecords.js",
        "listgrid/filterDataSource.js",
        "listgrid/pivotgrid.js",
    ];
    window.examples = [];
    list.forEach(function(element) {
        document.writeln("<script src='./code/" + element + "'></script>");
    });
})();
