module.exports = function(app, options) {

	var mongoose = options.mongoose;
	var Schema = options.mongoose.Schema;
	var db = options.db;

	var TimeSheetModel = require('../schemas/timeSheetSchema')(db, mongoose);

	var timeSheetController = require('../controllers/timeSheetController')(
		TimeSheetModel);



	app.get('/viewUserTimesheets', timeSheetController.viewUserTimesheets);

	app.get('/viewAllTimesheets', timeSheetController.viewAllTimesheets);


	app.get('/getTimesheet', timeSheetController.getTimesheet);

	app.get('/viewTimesheets', timeSheetController.viewTimesheets);



	app.get('/editTimesheet', timeSheetController.editTimesheet);


	app.post('/createTimeSheet', timeSheetController.createTimeSheet);
	app.post('/modifyTimeSheet', timeSheetController.modifyTimeSheet);



};
