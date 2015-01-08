module.exports = function(FileControllerModel) {

	var fs = require('fs');
	return {

		uploadFile: function(req, res) {
			fc = new FileContent
			fs.readFile(req.files.upload.path, function(err, data) {
				console.log(req.files.upload.path)
				fc.content = data;
				fc.save(function(err, result) {
					if (err) // ...
						console.log(err);

					fs.unlink(req.files.upload.path, function(err) {
						if (err) throw err;
						//res.sendfile(html_dir + '/userWelcome.html');
						console.log(result._id)
						res.send({
							"status": "success",
							"resultId": result._id,
							"fileName": req.files.upload.originalname
						});
						//res.send('File uploaded to: ' + target_path + ' - ' + req.files.timesheet.size + ' bytes');
					});


				});
			});
		}

		,
		removeFile: function(req, res) {
			FileContent.findByIdAndRemove(req.query.id, function(err, data) {

				res.send({
					"status": "success"
				});

			});

		}

		,
		showFile: function(req, res) {
			FileContent.findOne({
				_id: req.query.id
			}, function(err, data) {

				res.setHeader('Content-disposition', 'attachment; filename=' + req.query
					.originalName);
				//res.contentType('application/vnd.ms-excel');
				res.send(data.content);

			});


		}


	}
}
