const version = require('package-version');
version('./', function(err, version){
  if(err){
    console.log('error:', err.stack);
    return;
  }
  console.log('version:', version);
});
