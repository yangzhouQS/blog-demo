(function() {
    var treeRecords;

    var grid = function() {
        var cachedDataSource = kakaGrid.data.CachedDataSource.ofArray(treeRecords);
        var treeDataSource = new kakaGrid.data.TreeDataSource(cachedDataSource, {
            keyField: "ID",
            parentKeyField: "parentID",
            expandedKeys: [30],
        });
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "check",
                caption: function() {
                    return ""
                },
                width: 50,
                columnType: "check",
                action: "check",
            }, {
                field: "State",
                caption: "State",
                width: 200,
                columnType: "tree",
                // action: new kakaGrid.columns.action.InlineInputEditor({
                //     type: "text"
                // }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                }),
                icon: {
                    svg: function(rec) {
                        var color = rec.parentID ? "#0ff" : "#ff0";
                        return "<svg class='icon' width='16px' height='16px' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z' fill='" + color + "'/></svg>";
                    },
                    width: 16,
                },
                style: {
                    // linkColor: "#0f0",
                    padding: [0, 0, 0, -12]
                }
            }, {
                field: "ID",
                caption: "ID",
                width: 100,
            }, {
                field: "parentID",
                caption: "parentID",
                width: 100,
            }, { /* multiple header */
                caption: "Latitude and longitude",
                columns: [{
                    action: new kakaGrid.columns.action.InlineInputEditor({
                        type: "number",
                        classList: ["al-right"]
                    }),
                    field: "Latitude",
                    caption: "Latitude",
                    columnType: new kakaGrid.columns.type.NumberColumn({
                        format: new Intl.NumberFormat("en", { useGrouping: false, maximumFractionDigits: 20 }),
                    }),
                    width: 200
                }, {
                    action: new kakaGrid.columns.action.InlineInputEditor({
                        type: "number",
                        classList: ["al-right"]
                    }),
                    field: "Longitude",
                    caption: "Longitude",
                    columnType: new kakaGrid.columns.type.NumberColumn({
                        format: new Intl.NumberFormat("en", { useGrouping: false, maximumFractionDigits: 20 }),
                    }),
                    width: 200
                }]
            }],
            frozenColCount: 2,
            underlayRowCount: -1,
            underlayRowHeight: "auto",
            dataSource: treeDataSource,
            theme: {
                tree: {
                    lineColor: "#CCC",
                    buttonColor: "#FFF",
                    buttonBgColor: "#CCC",
                    buttonBorderColor: "#CCC",
                    linkColor: "#F00",
                }
            }
        });

        grid.dataSource.expandToLevel(1); // 展开到指定级别

        grid.dataSource.expandAll(); // 展开全部

        var index = grid.dataSource.expandToKey(11); // 展开到指定 ID 对应的记录

        grid.dataSource.collapse(index, true); // 根据显示记录索引，收起对应记录下的所有展开节点

        grid.makeVisibleGridCell("State", index); // 根据显示记录索引，呈现对应的单元格
        grid.focusGridCell("State", index); // 根据显示记录索引，设置对应的单元格焦点
        
        return grid;
    };

    var data = function() {
        var treeRecords = [
            { ID: 40, parentID: null, State: "China",         Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID: 30, parentID: null, State: "France",        Latitude: 46.1274793, Longitude: -2.288454 },
            { ID: 31, parentID:   30, State: "Paris",         Latitude: 48.8588376, Longitude: 2.2773459 },
            { ID: 20, parentID: null, State: "USA",           Latitude: 36.2161472, Longitude: -113.6866279 },
            { ID:  1, parentID:   20, State: "New York",      Latitude: 40.7055651, Longitude: -74.118086 },
            { ID:  2, parentID:    1, State: "Albany",        Latitude: 42.6681345, Longitude: -73.846419 },
            { ID:  3, parentID:    1, State: "Syracuse",      Latitude: 43.0352286, Longitude: -76.1742994 },
            { ID:  4, parentID:   20, State: "California",    Latitude: 37.1870791, Longitude: -123.762638 },
            { ID:  5, parentID:    4, State: "Alameda",       Latitude: 37.8759458, Longitude: -122.2981316 },
            { ID:  6, parentID:    4, State: "Orange",        Latitude: 33.5482634, Longitude: -117.8447927 },
            { ID: 60, parentID:    6, State: "Anaheim",       Latitude: 33.5482634, Longitude: -117.8447927 },
            { ID: 61, parentID:    6, State: "Laguna",        Latitude: 33.5482634, Longitude: -117.8447927 },
            { ID: 62, parentID:    6, State: "Irvine",        Latitude: 33.5482634, Longitude: -117.8447927 },
            { ID:  7, parentID:    4, State: "Ventura",       Latitude: 36.5943628, Longitude: -121.9025183 },
            { ID: 70, parentID:    7, State: "Anaheim",       Latitude: 36.5943628, Longitude: -121.9025183 },
            { ID: 71, parentID:    7, State: "Garden Grove",  Latitude: 36.5943628, Longitude: -121.9025183 },
            { ID: 72, parentID:    7, State: "Irvine",        Latitude: 36.5943628, Longitude: -121.9025183 },
            { ID: 73, parentID:   72, State: "Monterey",      Latitude: 36.5943628, Longitude: -121.9025183 },
            { ID:  8, parentID:   20, State: "Fullerton",     Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID:  9, parentID:    8, State: "Boston",        Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID: 10, parentID:    8, State: "Worcester",     Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID: 11, parentID:    8, State: "Lowell",        Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID: 12, parentID:   11, State: "Pudding Lane",  Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID: 50, parentID: null, State: "Canada",        Latitude: 42.6369691, Longitude: -71.3618803 },
        ];
        return treeRecords;
    };
    treeRecords = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}";

    window.examples.push({
        key: "listgrid/treegrid",
        grid: grid,
        style: style,
        data: data,
    });
})();