module.exports = function(db) {
	return db.model('FileContent', FileContentSchema());
}

function FileContentSchema() {
	return {
		content: Buffer
	}
}
