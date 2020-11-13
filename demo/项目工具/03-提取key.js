const key = {
  service: {
    input: 'src/controllers/index.js',
    output: 'dist/app.js'
  },
}
console.log(Object.keys(key).join())
Object.keys(key).forEach(r => console.log(r))
