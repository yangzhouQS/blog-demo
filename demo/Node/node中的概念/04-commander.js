const program = require('commander');
program
    .name("yz")
    .version('0.0.1')
    .usage('[options]参数说明')
    .option("-p, --port<v>", 'set server port')
    .parse(process.argv)

console.log(program.port)
