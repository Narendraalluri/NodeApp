module.exports = function(db, mongoose) {

	var Sheets = new mongoose.Schema({
		project: String,
		sunday: Number,
		monday: Number,
		tuesday: Number,
		wednesday: Number,
		thursday: Number,
		friday: Number,
		saturday: Number,
		total: Number,
		status: Boolean
	});
	var File = new mongoose.Schema({
		id: String,
		name: String

	});

	function TimeSheetSchema() {
		return {
			clientApproved: String,
			userId: String,
			userName: String,
			name: String,
			startDate: String,
			endDate: String,
			sheets: [Sheets],
			total: Number,
			comments: String,
			uploadedFiles: [File]
		}
	}
	return db.model('TimeSheet', TimeSheetSchema());
}
