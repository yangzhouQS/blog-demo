(function() {
    var generatePersonsDataSource;

    var grid = function() {
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [{
                field: "check",
                caption: "",
                width: 50,
                columnType: "check",
                action: "check"
            }, {
                field: "personid",
                caption: "ID",
                width: 85,
                columnType: "center"
            }, {
                field: "stars",
                caption: "Class",
                width: 150,
                columnType: new kakaGrid.columns.type.IconColumn({
                    name: "star"
                }),
                style: {
                    color: "gold"
                },
                action: new kakaGrid.columns.action.InlineMenuEditor({
                    options: [{
                        value: 1,
                        classList: "stars",
                        html: "<i class='material-icons'>star</i>"
                    }, {
                        value: 2,
                        classList: "stars",
                        html: "<i class='material-icons'>star</i>".repeat(2)
                    }, {
                        value: 3,
                        classList: "stars",
                        html: "<i class='material-icons'>star</i>".repeat(3)
                    }, {
                        value: 4,
                        classList: "stars",
                        html: "<i class='material-icons'>star</i>".repeat(4)
                    }, {
                        value: 5,
                        classList: "stars",
                        html: "<i class='material-icons'>star</i>".repeat(5)
                    }]
                })
            }, {
                caption: "Name",
                columns: [{
                    field: "fname",
                    caption: "First Name",
                    width: "20%",
                    minWidth: 150,
                    action: new kakaGrid.columns.action.SmallDialogInputEditor({
                        classList: "helper-text--right-justified",
                        helperText: function(value) {
                            return value.length + "/20";
                        },
                        inputValidator: function(value) {
                            return value.length > 20 ? "over the max length. " + value.length : null;
                        }
                    })
                }, {
                    field: "lname",
                    caption: "Last Name",
                    width: "20%",
                    minWidth: 150,
                    action: new kakaGrid.columns.action.SmallDialogInputEditor({
                        classList: "helper-text--right-justified",
                        helperText: function(value) {
                            return value.length + "/20";
                        },
                        inputValidator: function(value) {
                            return value.length > 20 ? "over the max length. " + value.length : null;
                        }
                    })

                }]
            }, {
                field: "progress",
                caption: "Progress",
                width: "10%",
                minWidth: 50,
                columnType: new kakaGrid.columns.type.PercentCompleteBarColumn({
                    formatter: function(v) {
                        return v + "%";
                    }
                }),
                style: {
                    textAlign: "right",
                    padding: [0, 10, 0, 0]
                },
                action: new kakaGrid.columns.action.SmallDialogInputEditor({
                    type: "number",
                    classList: ["al-right"],
                    inputValidator: function(value) {
                        return value > 100 ? "over the max value. " + value : value < 0 ? "under the min value. " + value : null;
                    }
                })
            }, {
                field: "email",
                caption: "Email",
                width: "calc(50% - 505px - 20px)",
                minWidth: 200,
                action: new kakaGrid.columns.action.SmallDialogInputEditor({
                    helperText: function() {
                        return "Email";
                    },
                    validator: function(value) {
                        var ret = value.match(/^[-a-z0-9~!$%^&*_=+}{"?]+(\.[-a-z0-9~!$%^&*_=+}{"?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
                        return ret ? null : "Please enter email addr.";
                    }
                })
            }, {
                field: {
                    get: function(rec) {
                        var d = rec.birthday;
                        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                    },
                    set: function(rec, val) {
                        rec.birthday = new Date(val);
                    }
                },
                caption: "Birthday",
                width: 100,

                action: new kakaGrid.columns.action.SmallDialogInputEditor({
                    helperText: function() {
                        return "birthday";
                    },
                    validator: function(value) {
                        return isNaN(new Date(value)) ? "Please enter date." : null;
                    }
                })
            }, {
                caption: "",
                width: 120,
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    caption: "SHOW REC"
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }],
            frozenColCount: 2,
            dataSource: generatePersonsDataSource(1000000)
        });
        return grid;
    };

    var data = function() {
        var generatePerson = function generatePerson() {
            var fnames = ["Sophia", "Emma", "Olivia", "Isabella", "Ava", "Mia", "Emily", "Abigail", "Madison", "Elizabeth", "Charlotte", "Avery", "Sofia", "Chloe", "Ella", "Harper", "Amelia", "Aubrey", "Addison", "Evelyn", "Natalie", "Grace", "Hannah", "Zoey", "Victoria", "Lillian", "Lily", "Brooklyn", "Samantha", "Layla", "Zoe", "Audrey", "Leah", "Allison", "Anna", "Aaliyah", "Savannah", "Gabriella", "Camila", "Aria", "Noah", "Liam", "Jacob", "Mason", "William", "Ethan", "Michael", "Alexander", "Jayden", "Daniel", "Elijah", "Aiden", "James", "Benjamin", "Matthew", "Jackson", "Logan", "David", "Anthony", "Joseph", "Joshua", "Andrew", "Lucas", "Gabriel", "Samuel", "Christopher", "John", "Dylan", "Isaac", "Ryan", "Nathan", "Carter", "Caleb", "Luke", "Christian", "Hunter", "Henry", "Owen", "Landon", "Jack"];
            var lnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen", "Sanchez", "Wright", "King", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell", "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres", "Parker", "Collins", "Edwards", "Stewart", "Flores", "Morris", "Nguyen", "Murphy", "Rivera", "Cook", "Rogers", "Morgan", "Peterson", "Cooper", "Reed", "Bailey", "Bell", "Gomez", "Kelly", "Howard", "Ward", "Cox", "Diaz", "Richardson", "Wood", "Watson", "Brooks", "Bennett", "Gray", "James", "Reyes", "Cruz", "Hughes", "Price", "Myers", "Long", "Foster", "Sanders", "Ross", "Morales", "Powell", "Sullivan", "Russell", "Ortiz", "Jenkins", "Gutierrez", "Perry", "Butler", "Barnes", "Fisher"];
            var msOfYear = 365 * 24 * 60 * 60 * 1000;
            return function (index) {
                var fname = fnames[Math.floor(Math.random() * fnames.length)];
                var lname = lnames[Math.floor(Math.random() * lnames.length)];
                var birthday = new Date(Date.now() - 20 * msOfYear - Math.floor(Math.random() * 15 * msOfYear));
                birthday = new Date(birthday.getFullYear(), birthday.getMonth(), birthday.getDate(), 0, 0, 0, 0);
                return {
                    personid: index + 1,
                    fname: fname,
                    lname: lname,
                    email: (fname.replace("-", "_") + "_" + lname.replace("-", "_") + "@example.com").toLowerCase(),
                    birthday: birthday,
                    stars: Math.floor(Math.random() * 5) + 1,
                    progress: Math.min(Math.floor(Math.random() * (120)), 100)
                };
            };
        }();

        function generatePersonsDataSource(num) {
            var array = new Array(num);
            for (var i = 0; i < 100; i++) {
                array[i] = generatePerson(i);
            }
            return new kakaGrid.data.CachedDataSource({
                get: function get(index) {
                    return array[index] ? array[index] : array[index] = generatePerson(index);
                },

                length: num
            });
        }

        return generatePersonsDataSource;
    };
    generatePersonsDataSource = data();

    var style = ".kaka-grid__inline-menu__menu-item.stars {\n" +
        "    text-align: center;\n" +
        "    color: gold;\n" +
        "    display: block;\n" +
        "    white-space: nowrap;\n" +
        "}\n" +
        ".kaka-grid__inline-menu__menu-item.stars .material-icons {\n" +
        "    line-height: 40px;\n" +
        "}";

    window.examples.push({
        key: "sample/welcome",
        grid: grid,
        style: style,
        data: data,
    });
})();
