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
                width: 100,
                columnType: "center"
            }, { /* multiple header */
                caption: "Name",
                columns: [{
                    field: "fname",
                    caption: "First Name",
                    width: "auto",
                    maxWidth: "200px"
                }, {
                    field: "lname",
                    caption: "Last Name",
                    width: "auto",
                    minWidth: "150px"
                }]
            }, {
                field: "email",
                caption: "Email",
                width: "auto",
                minWidth: "200px"
            }, {
                /* callback field */
                field: function field(rec) {
                    var d = rec.birthday;
                    return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
                },

                caption: "Birthday",
                width: 100
            }, {
                caption: "Button",
                width: 120,
                /* button column */
                columnType: new kakaGrid.columns.type.ButtonColumn({
                    caption: "SHOW REC"
                }),
                action: new kakaGrid.columns.action.ButtonAction({
                    action: function action(rec) {
                        alert(JSON.stringify(rec));
                    }
                })
            }],
            dataSource: generatePersonsDataSource(1000000),
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

    var style = "";

    window.examples.push({
        key: "sample/sample",
        grid: grid,
        style: style,
        data: data,
    });
})();