(function() {
    var personsDataSource;

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
        var generatePersonDataSource = function(num) {
            var array = new Array(num)
            return new kakaGrid.data.CachedDataSource({
                get: function(index) {
                    return array[index] ? array[index] : (array[index] = generatePerson(index))
                },
                length: num
            })
        }
        var personsDataSource = generatePersonDataSource(10000)

        return personsDataSource;
    };
    personsDataSource = data();

    var grid = function() {
        var filterDataSource = new kakaGrid.data.FilterDataSource(personsDataSource);
        var grid = new kakaGrid.ListGrid({
            parentElement: document.getElementById("kaka-grid"),
            header: [
                {field: 'check', caption: '', width: 50, columnType: 'check', action: 'check'},
                {field: 'personid', caption: 'ID', width: 100},
                {
                  caption: 'name',
                  columns: [
                    {field: 'fname', caption: 'First Name', width: 200},
                    {field: 'lname', caption: 'Last Name', width: 200},
                  ],
                },
                {field: 'email', caption: 'Email', width: 250},
                {
                  field: function(rec) {
                    var d = rec.birthday;
                    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
                  },
                  caption: 'birthday',
                  width: 100
                },
                {
                  caption: 'button',
                  width: 120,
                  /* button column */
                  columnType: new kakaGrid.columns.type.ButtonColumn({
                    caption: 'SHOW REC',
                  }),
                  action: new kakaGrid.columns.action.ButtonAction({
                    action: function(rec) {
                      alert(JSON.stringify(rec));
                    },
                  }),
                }
            ],
            dataSource: filterDataSource,
        });

        window.filter = function(filterValue) {
            filterDataSource.filter = filterValue ? function(record) {
                for (var k in record) {
                if ((record[k] + '').indexOf(filterValue) >= 0) {
                    return true;
                }
                }
                return false;
            } : null;
            grid.invalidate();
        }

        window.filter('Gabriella') // 调用此方法测试过滤效果

        return grid;
    };

    var style = "";

    window.examples.push({
        key: "listgrid/filterDataSource",
        grid: grid,
        style: style,
        data: data,
    });
})();