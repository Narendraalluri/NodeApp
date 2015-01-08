module.exports = function(UserModel) {

	// Bootstrapping - Adding the initial admin user -- to be removed before prod.
	UserModel.findOne({
		email: "admin@gmail.com",
		password: "admin"
	}, function(err, data) {
		if (data == null) {
			var newUser = new user;
			newUser.firstName = "Admin";
			newUser.lastName = "Admin";
			newUser.email = "admin@gmail.com";
			newUser.password = "admin";
			newUser.role = "admin";
			newUser.save(function(err1) {
				console.log("Added admin user")
			});
		}


	});

	return {



		addUser: function(req, res) {
			UserModel.findOne({
				email: req.body.email
			}, function(err, data) {
				if (data == null) {

					var newUser = new UserModel;
					console.log(req.body)
					newUser.firstName = req.body.firstName;
					newUser.lastName = req.body.lastName;
					newUser.email = req.body.email;
					newUser.password = req.body.password;
					newUser.role = req.body.role;
					newUser.save(function(err1) {
						if (err1) // ...
							res.send({
							"status": "failed"
						});


					});
					res.send({
						"status": "success"
					});
				} else {
					res.send({
						"status": "failed"
					});
				}
			});

			//res.sendfile(html_dir + '/Users.html');
		}


		,
		deleteUser: function(req, res) {

			console.log(req.query.id)

			UserModel.findByIdAndRemove(req.query.id, function(err, data) {

				res.json({
					"status": "success"
				});

			});
		}

		,
		updateUser: function(req, res) {

			console.log("Update User " + req.body.id)

			UserModel.findByIdAndUpdate(req.body.id, {
				$set: {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					role: req.body.role
				}
			}, function(err, tank) {
				//res.sendfile(html_dir + '/Users.html');
				console.log("Update User " + err)

				res.json({
					"status": "success"
				});



			});

		}



		,
		editUser: function(req, res) {
			UserModel.findById(req.query.id, function(err, data) {

				res.json(data);

			});
		}

		,
		getUser: function(req, res) {
			UserModel.findById(req.query.id, function(err, data) {

				res.json(data);

			});
		}

		,
		showUser: function(req, res) {
			UserModel.find({}, function(err, data) {

				res.json(data);

			});
		}

		,
		getLoggedInUser: function(req, res) {

			data = {
				user: req.session.loggedInUserData
			}
			res.json(data);
		}

		,
		loginUser: function(req, res) {
			// console.log(req.body)



			UserModel.findOne({
				email: req.body.email,
				password: req.body.password
			}, function(err, data) {
				console.log(data)
				if (data == null) {
					//res.sendfile(html_dir + '/loginfailed.html');;
					res.json({
						status: "failed"
					});
				} else {
					req.session.loggedInUser = req.body.email;
					req.session.loggedInRole = data.role
					req.session.loggedInId = data._id
					req.session.loggedInUserData = data
					res.json({
						status: "success",
						"user": data
					});
					//res.sendfile(html_dir + '/userWelcome.html');
				}

			});



		}

	}

}
