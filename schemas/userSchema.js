module.exports = function(db) {
	return db.model('User', UserSchema());
}

function UserSchema() {
	return {
		firstName: String,
		lastName: String,
		email: String,
		password: String,
		role: String
	}
}
