var NodePDF = require('nodepdf');

// options is optional, sets the width and height for the viewport to render the pdf from. (see additional options)
NodePDF.render('http://www.google.com', 'google.pdf', {}, function (err, filePath) {
	console.log(filePath)
	// handle error and filepath
});

// use default options
NodePDF.render('http://www.google.com', 'google.pdf', function (err, filePath) {
	console.log('-----------------')
	console.log(filePath)
	// handle error and filepath
});
