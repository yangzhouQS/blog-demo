const semver = require('semver')


console.log(semver.valid('1.2.3'))
console.log(semver.valid('a.b.c'))
console.log(semver.clean(' =3.1.3 '))
console.log(semver.gt('1.2.3', '9.8.7'))
console.log(semver.lt('1.2.3', '9.8.7'))
// console.log(semver.minVersion('>=1.0.0'))
console.log(semver.valid(semver.coerce('v2')))
console.log(semver.valid(semver.coerce('42.6.7.9.3-alpha')))



