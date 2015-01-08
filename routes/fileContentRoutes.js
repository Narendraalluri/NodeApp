module.exports = function(app, options) {

	var mongoose = options.mongoose;
	var Schema = options.mongoose.Schema;
	var db = options.db;

	var FileContentModel = require('../schemas/fileContentSchema')(db, mongoose);

	var fileContentController = require('../controllers/fileContentController')(
		FileContentModel);



	app.get('/showFile', fileContentController.showFile);

	app.get('/removeFile', fileContentController.removeFile);



	app.post('/uploadFile', fileContentController.uploadFile);



};
