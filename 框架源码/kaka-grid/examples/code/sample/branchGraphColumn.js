(function () {
    var records;

    var grid = function () {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [
                {
                    field: function(rec) {
                        return rec;
                    },
                    caption: "BranchGraph",
                    width: 200,
                    columnType: new kakaGrid.columns.type.BranchGraphColumn({
                        start: "top", // Specify the start and indicate the direction to proceed. "top" or "bottom". default "bottom"
                        cache: false // cache enable. default false
                    }),
                },
                {
                    field: function(rec) {
                        return JSON.stringify(rec) + ",";
                    },
                    caption: "command",
                    width: 1000
                },
            ],
            frozenColCount: 1,
            records: records,
        });
        return grid;
    };

    var data = function () {
        var records = [
            [
                // new branch "mastar"
                {
                    command: "branch",
                    branch: "mastar"
                },
                // and commit "mastar" branch
                {
                    command: "commit",
                    branch: "mastar"
                }
            ],
            [
                // commit "mastar" branch
                {
                    command: "commit",
                    branch: "mastar"
                },
            ],
            [
                // new branch "develop". from "mastar"
                {
                    command: "branch",
                    branch: {
                        from: "mastar",
                        to: "develop"
                    }
                },
            ],
            [
                // commit "develop" branch
                {
                    command: "commit",
                    branch: "develop"
                },
            ],
            [
                // merge "develop" branch into "master" branch
                {
                    command: "merge",
                    branch: {
                        from: "develop",
                        to: "mastar"
                    }
                },
                // and tag with v.0.0.1
                {
                    command: "tag",
                    branch: "mastar",
                    tag: "v1.0.0"
                },
            ],
            [
                null // not doing
            ],
            //-------------------------
            [{
                command: "branch",
                branch: {
                    from: "develop",
                    to: "develop2"
                }
            }, {
                command: "commit",
                branch: "develop2"
            }],
            [{
                command: "branch",
                branch: {
                    from: "develop",
                    to: "develop3"
                }
            }, {
                command: "commit",
                branch: "develop3"
            },
            {
                command: "merge",
                branch: {
                    from: "develop2",
                    to: "mastar"
                }
            }],
            [{
                command: "commit",
                branch: "develop2"
            }],
            [{
                command: "branch",
                branch: {
                    from: "develop2",
                    to: "develop4"
                }
            }, {
                command: "commit",
                branch: "develop4"
            },
            {
                command: "branch",
                branch: {
                    from: "develop2",
                    to: "develop5"
                }
            }, {
                command: "commit",
                branch: "develop5"
            }],
            [{
                command: "commit",
                branch: "develop2"
            }],
            [{
                command: "tag",
                branch: "mastar",
                tag: "v1.1.0"
            },
            {
                command: "commit",
                branch: "mastar"
            },
            {
                command: "commit",
                branch: "develop4"
            }],
            {
                command: "commit",
                branch: "develop3"
            }
        ];
        return records;
    };
    records = data();

    var style = ".al-right {\n" +
        "    text-align: right;\n" +
        "}\n" +
        ".kaka-grid .kaka-grid__tooltip-element {\n" +
        "    color: #ddd;\n" +
        "    background-color: rgba(0, 0, 0, 0.7);\n" +
        "}";

    window.examples.push({
        key: "sample/branchGraphColumn",
        grid: grid,
        style: style,
        data: data,
    });
})();