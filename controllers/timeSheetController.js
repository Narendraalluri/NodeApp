module.exports = function(TimeSheetModel) {


	return {


		viewUserTimesheets: function(req, res) {

			userId = req.query.userId

			TimeSheetModel.find({
				"userId": userId
			}, '_id startDate endDate total clientApproved', function(err,
				data) {

				res.json(data);

			});
		}

		,
		viewAllTimesheets: function(req, res) {

			userId = req.query.userId

			TimeSheetModel.find({},
				'_id userName startDate endDate total clientApproved',
				function(err, data) {

					res.json(data);

				});
		},
		getTimesheet: function(req, res) {

			TimeSheetModel.find({
				'_id': req.query.id
			}, function(err, data) {
				console.log("In View user TimeSheet " + req.query.id + "  " +
					data)
				res.json(data);

			});
		}

		,
		viewTimesheets: function(req, res) {
			console.log("In View TimeSheet")
			userId = req.session.loggedInId
			if (req.query != null && req.query.id != null) {
				userId = req.query.id
				console.log(req.query.id)
			}

			console.log(userId)

			date3Months = new Date();
			date3Months.setMonth(date3Months.getMonth() - 3)
			timeSheet.find({
					'name': userId,
					'createDate': {
						'$gt': date3Months
					}
				},
				'clientApproved name originalName startDate endDate monday tuesday wednesday thursday friday saturday sunday _id status',
				function(err, data) {

					res.json(data);

				});
		},
		editTimesheet: function(req, res) {
			console.log(req.query.id)
			TimeSheetModel.findById(req.query.id, function(err, data) {

				res.json(data);

			});
		},
		createTimeSheet: function(req, res) {
			var ts = new TimeSheetModel;
			ts.startDate = req.body.startDate
			ts.endDate = req.body.endDate
			ts.clientApproved = req.body.clientApproved
			ts.total = req.body.total
			ts.comments = req.body.comments
			ts.userId = req.body.userId
			ts.userName = req.body.userName
			ts.uploadedFiles = req.body.uploadedFiles
			ts.sheets = req.body.sheets
			console.log(req.body.sheets)
			ts.save(function(err) {
				console.log("Timesheet Saved" + err)
				res.send({
					"status": "success"
				});
			});


		},
		modifyTimeSheet: function(req, res) {
			var ts = new TimeSheetModel;
			ts.startDate = req.body.startDate
			ts.endDate = req.body.endDate
			ts.clientApproved = req.body.clientApproved
			ts.total = req.body.total
			ts.comments = req.body.comments
			ts.uploadedFiles = req.body.uploadedFiles
			ts.sheets = req.body.sheets
			console.log(req.body.uploadedFiles)
			TimeSheetModel.findByIdAndUpdate(req.query.id, {
				$set: {
					sheets: req.body.sheets,
					comments: req.body.comments,
					uploadedFiles: req.body.uploadedFiles,
					startDate: req.body.startDate,
					endDate: req.body.endDate,
					clientApproved: req.body.clientApproved,
					total: req.body.total
				}
			}, function(err) {
				console.log("Timesheet Updated" + err)
				res.send({
					"status": "success"
				});
			});


		}

	}

}
