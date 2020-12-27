const {createClient} = require("node-impala")
const client = createClient();

client.connect({
    host: '172.16.6.30',
    port: 21050,
    resultType: 'json-array'
});

client.query('SELECT column_name FROM table_name')
    .then(result => console.log(result))
    .catch(err => console.error(err))
    .done(() => client.close().catch(err => console.error(err)));
