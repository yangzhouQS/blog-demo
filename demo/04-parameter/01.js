var Parameter = require('parameter');

var parameter = new Parameter({
  // translate: function () {
  //   var args = Array.prototype.slice.call(arguments);
  //   // Assume there have I18n.t method for convert language.
  //   return I18n.t.apply(I18n, args);
  // },
  // validateRoot: true // restrict the being validate value must be a object
});

var data = {
  name: 'foo',
  age: 24,
  gender: 'male'
};

var rule = {
  name: { type: 'string', min: 5 },
  age: 'int',
  gender: ['male', 'female', 'unknown']
};

var errors = parameter.validate(rule, data);
console.log(errors)
