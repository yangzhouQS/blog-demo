const user = { firstName: 'Bobby', lastName: 'Fischer' }

const fullName = (firstName, lastName) => [firstName, lastName].join(' ')

console.log(fullName(user.firstName, user.lastName))


const joinWithSeparator = (...args) => args.join(' ')
console.log(joinWithSeparator(user.firstName, user.lastName))
console.log(joinWithSeparator(joinWithSeparator('a', 'b'), 'c'))
console.log('a', joinWithSeparator('b', 'c'))


const identity = (a) => a

