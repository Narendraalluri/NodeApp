module.exports = function() {

	return {

		showOptions: function(req, res) {
			if (req.session.loggedInRole == 'admin')
				data = [{
					name: "Add Employees",
					link: "createUser.html"
				}, {
					name: "View Employees",
					link: "Users.html"
				}]
			else
				data = [{
					name: "Create TimeSheet",
					link: "createTimeSheet.html"
				}, {
					name: "View TimeSheets",
					link: "viewTimeSheets.html"
				}]
			res.json(data);
		}



	}

}
