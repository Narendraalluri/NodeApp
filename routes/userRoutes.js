module.exports = function(app, options) {

	var mongoose = options.mongoose;
	var Schema = options.mongoose.Schema;
	var db = options.db;

	var UserModel = require('../schemas/userSchema')(db);

	var userController = require('../controllers/userController')(UserModel);



	app.post('/addUser', userController.addUser);

	app.get('/deleteUser', userController.deleteUser);


	app.post('/updateUser', userController.updateUser);

	app.get('/getUser', userController.getUser);

	app.get('/showUsers', userController.showUser);

	app.get('/editUser', userController.editUser);



	app.get('/getLoggedInUser', userController.getLoggedInUser);

	app.post('/loginUser', userController.loginUser);



};
