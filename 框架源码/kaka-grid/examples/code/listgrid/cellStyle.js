(function() {
    var treeRecords;
    var lookupStringRecords;

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
                field: "State",
                caption: "TreeColumn",
                width: 200,
                columnType: new kakaGrid.columns.type.TreeColumn({
                    cellStyle: function(e) {
                        // e.grid
                        // e.record
                        return {
                            innerBox: 'dashed'
                        }
                    }
                }),
                action: new kakaGrid.columns.action.InlineInputEditor({
                    type: "text"
                }),
                icon: {
                    svg: function(rec) {
                        var color = rec.parentID ? "#0ff" : "#ff0";
                        return "<svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M4,4L12,4L12,12L4,12Z' fill='" + color + "'/></svg>";
                    },
                    width: 16,
                },
                style: {
                    padding: [0, 0, 0, -16],
                    inputPadding: [0, 0, 0, -2]
                }
            }, {
                field: "State1",
                caption: "Column(R)",
                width: 100,
                columnType: new kakaGrid.columns.type.Column({
                    cellStyle: {
                        innerBox: 'dashed'
                    },
                }),
                action: new kakaGrid.columns.action.InlineInputEditor({
                    classList: ["al-right"]
                }),
                style: {
                    textAlign: "right",
                    padding: [0,8,0,8],
                    inputPadding: [0,6,0,6]
                }
            }, {
                field: "State2",
                caption: "Column(L)",
                width: 100,
                columnType: new kakaGrid.columns.type.Column({
                    cellStyle: {
                        innerBox: 'dashed'
                    },
                }),
                action: new kakaGrid.columns.action.InlineInputEditor({
                }),
                style: {
                    padding: [0,8,0,8],
                    inputPadding: [0,6,0,6]
                }
            }, {
                field: "Latitude",
                caption: "NumberColumn",
                columnType: new kakaGrid.columns.type.NumberColumn({
                    cellStyle: {
                        innerBox: 'dashed'
                    },
                    format: new Intl.NumberFormat("en", { useGrouping: false, maximumFractionDigits: 20 }),
                }),
                action: new kakaGrid.columns.action.InlineInputEditor({
                    type: "number",
                    classList: ["al-right"]
                }),
                width: 130,
                style: {
                    padding: [0,8]
                }
            }, {
                field: "State3",
                caption: "LookupColumn",
                width: 170,
                columnType: new kakaGrid.columns.type.LookupColumn({
                    records: lookupStringRecords,
                    valueField: "name",
                    captionField: "displayName",
                    cellStyle: {
                        innerBox: 'dashed'
                    },
                }),
                action: new kakaGrid.columns.action.InlineLookupEditor({
                    records: lookupStringRecords,
                    valueField: "name",
                    captionField: "displayName",
                    allowOtherInput: false,
                }),
                style: {
                    padding: [0,8,0,8],
                    inputPadding: [0,6,0,6]
                }
            }, {
                field: "Text",
                caption: "MultilineTextColumn",
                width: 170,
                columnType: new kakaGrid.columns.type.MultilineTextColumn({
                    cellStyle: {
                        innerBox: 'dashed'
                    },
                }),
                action: new kakaGrid.columns.action.InlineTextAreaEditor({
                }),
                style: {
                    padding: [0, 8],
                    inputPadding: [0, 6],
                }
            }],
            frozenColCount: 2,
            underlayRowCount: -1,
            underlayRowHeight: "auto",
            dataSource: treeDataSource,
            theme: {
                selectionBgColor: "#FFF",
                highlightBorderColor: "#24A7E3",
                highlightBorderWidth: 2,
                tree: {
                    lineColor: "#CCC",
                    buttonColor: "#FFF",
                    buttonBgColor: "#CCC",
                    buttonBorderColor: "#CCC"
                }
            }
        });
        return grid;
    };

    var data = function() {
        var treeRecords = [
            { ID: 40, parentID: null, State: "China",         State1: "China",         State2: "China",         State3: "China",         Latitude: 42.6369691, Longitude: -71.3618803,  Text: "111\n222" },
            { ID: 30, parentID: null, State: "France",        State1: "France",        State2: "France",        State3: "France",        Latitude: 46.1274793, Longitude: -2.288454,    Text: "333"  },
            { ID: 31, parentID:   30, State: "Paris",         State1: "Paris",         State2: "Paris",         State3: "Paris",         Latitude: 48.8588376, Longitude: 2.2773459 },
            { ID: 20, parentID: null, State: "USA",           State1: "USA",           State2: "USA",           State3: "USA",           Latitude: 36.2161472, Longitude: -113.6866279 },
            { ID:  1, parentID:   20, State: "New York",      State1: "New York",      State2: "New York",      State3: "New York",      Latitude: 40.7055651, Longitude: -74.118086 },
            { ID:  2, parentID:    1, State: "Albany",        State1: "Albany",        State2: "Albany",        State3: "Albany",        Latitude: 42.6681345, Longitude: -73.846419 },
            { ID:  3, parentID:    1, State: "Syracuse",      State1: "Syracuse",      State2: "Syracuse",      State3: "Syracuse",      Latitude: 43.0352286, Longitude: -76.1742994 },
            { ID:  4, parentID:   20, State: "California",    State1: "California",    State2: "California",    State3: "California",    Latitude: 37.1870791, Longitude: -123.762638 },
            { ID:  5, parentID:    4, State: "Alameda",       State1: "Alameda",       State2: "Alameda",       State3: "Alameda",       Latitude: 37.8759458, Longitude: -122.2981316 },
            { ID:  6, parentID:    4, State: "Orange",        State1: "Orange",        State2: "Orange",        State3: "Orange",        Latitude: 33.5482634, Longitude: -117.8447927 },
            { ID: 60, parentID:    6, State: "Anaheim",       State1: "Anaheim",       State2: "Anaheim",       State3: "Anaheim",       Latitude: 33.5482634, Longitude: -117.8447927 },
            { ID: 61, parentID:    6, State: "Laguna",        State1: "Laguna",        State2: "Laguna",        State3: "Laguna",        Latitude: 33.5482634, Longitude: -117.8447927 },
            { ID: 62, parentID:    6, State: "Irvine",        State1: "Irvine",        State2: "Irvine",        State3: "Irvine",        Latitude: 33.5482634, Longitude: -117.8447927 },
            { ID:  7, parentID:    4, State: "Ventura",       State1: "Ventura",       State2: "Ventura",       State3: "Ventura",       Latitude: 36.5943628, Longitude: -121.9025183 },
            { ID: 70, parentID:    7, State: "Anaheim",       State1: "Anaheim",       State2: "Anaheim",       State3: "Anaheim",       Latitude: 36.5943628, Longitude: -121.9025183 },
            { ID: 71, parentID:    7, State: "Garden Grove",  State1: "Garden Grove",  State2: "Garden Grove",  State3: "Garden Grove",  Latitude: 36.5943628, Longitude: -121.9025183 },
            { ID: 72, parentID:    7, State: "Irvine",        State1: "Irvine",        State2: "Irvine",        State3: "Irvine",        Latitude: 36.5943628, Longitude: -121.9025183 },
            { ID: 73, parentID:   72, State: "Monterey",      State1: "Monterey",      State2: "Monterey",      State3: "Monterey",      Latitude: 36.5943628, Longitude: -121.9025183 },
            { ID:  8, parentID:   20, State: "Fullerton",     State1: "Fullerton",     State2: "Fullerton",     State3: "Fullerton",     Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID:  9, parentID:    8, State: "Boston",        State1: "Boston",        State2: "Boston",        State3: "Boston",        Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID: 10, parentID:    8, State: "Worcester",     State1: "Worcester",     State2: "Worcester",     State3: "Worcester",     Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID: 11, parentID:    8, State: "Lowell",        State1: "Lowell",        State2: "Lowell",        State3: "Lowell",        Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID: 12, parentID:   11, State: "Pudding Lane",  State1: "Pudding Lane",  State2: "Pudding Lane",  State3: "Pudding Lane",  Latitude: 42.6369691, Longitude: -71.3618803 },
            { ID: 50, parentID: null, State: "Canada",        State1: "Canada",        State2: "Canada",        State3: "Canada",        Latitude: 42.6369691, Longitude: -71.3618803 },
        ];
        var lookupStringRecords = [
            { "name": "", "displayName": "Empty" },
            { "name": "China", "displayName": "China" },
            { "name": "France", "displayName": "France" },
            { "name": "Paris", "displayName": "Paris" },
            { "name": "USA", "displayName": "USA" },
            { "name": "New York", "displayName": "New York" },
            { "name": "Albany", "displayName": "Albany" },
            { "name": "Syracuse", "displayName": "Syracuse" },
            { "name": "California", "displayName": "California" },
            { "name": "Alameda", "displayName": "Alameda" },
            { "name": "Orange", "displayName": "Orange" },
            { "name": "Anaheim", "displayName": "Anaheim" },
            { "name": "Laguna", "displayName": "Laguna" },
            { "name": "Irvine", "displayName": "Irvine" },
            { "name": "Ventura", "displayName": "Ventura" },
            { "name": "Garden Grove", "displayName": "Garden Grove" },
            { "name": "Monterey", "displayName": "Monterey" },
            { "name": "Fullerton", "displayName": "Fullerton" },
            { "name": "Boston", "displayName": "Boston" },
            { "name": "Worcester", "displayName": "Worcester" },
            { "name": "Lowell", "displayName": "Lowell" },
            { "name": "Pudding Lane", "displayName": "Pudding Lane" },
            { "name": "Canada", "displayName": "Canada" },
        ];
        return { treeRecords: treeRecords, lookupStringRecords: lookupStringRecords};
    };
    var d = data();
    treeRecords = d.treeRecords;
    lookupStringRecords = d.lookupStringRecords;

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}\n"
    // 下拉列表样式
    style += ".kaka-grid__inline-lookup__dropdown-item {\n" +
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
        "}\n";
    // 边框框样式
    style += ".kaka-grid__inline-input,\n" +
        ".kaka-grid__inline-lookup__input,\n" +
        ".kaka-grid__inline-textarea {\n" +
        "   outline: none;\n" +
        "   border: 2px #008cd6 solid !important;\n" +
        "   border-radius: 2px;\n" +
        "}\n"
    

    window.examples.push({
        key: "listgrid/cellStyle",
        grid: grid,
        style: style,
        data: data,
    });
})();