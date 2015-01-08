uploadedFilesArray = []
var client = new XMLHttpRequest();

function upload() {
	var file = document.getElementById("timesheetFile");

	/* Create a FormData instance */
	var formData = new FormData();
	/* Add the file */
	formData.append("upload", file.files[0]);

	$.ajax({
		url: 'uploadFile',
		data: formData,
		cache: false,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function(data, status, req) {
			uploadedFilesArray.push({
				"id": data.resultId,
				"name": data.fileName
			})
			$("#UploadedFiles").append('<li id="file_' + data.resultId +
				'"><a href="showFile?originalName=' + data.fileName +
				'&id=' + data.resultId +
				'">' + data.fileName +
				'</a><a href="javascript:removeFile(\'' + data
				.resultId +
				'\')"><span class="glyphicon glyphicon-remove"></span></a></li>'
			);
		},
		error: function(req, status, error) {
			alert('Upload Failed');
		}
	});
}

function removeFile(id) {


	$.ajax({
		url: 'removeFile?id=' + id,
		cache: false,
		processData: false,
		contentType: false,
		type: 'GET',
		success: function(data, status, req) {

			for (i = 0; i < uploadedFilesArray.length; i++) {
				if (uploadedFilesArray[i].id == id) {
					uploadedFilesArray = uploadedFilesArray.splice(i, 1);
				}

			}
			$('#file_' + id).remove();

		},
		error: function(req, status, error) {
			alert('Upload Failed');
		}
	});
}


formatSingleDigit = function(str) {
	if (str < 10) return "0" + str
	else return str;
}
