module.exports = function(app, options) {

	var mongoose = options.mongoose;
	var Schema = options.mongoose.Schema;
	var db = options.db;

	var commonController = require('../controllers/commonController')();

	app.get('/showOptions', commonController.showOptions);

	var StatesSchema = require('../schemas/StateSchema')(db, mongoose);

	return {
		"StatesSchema" : StatesSchema
	}

};
