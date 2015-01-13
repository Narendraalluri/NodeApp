/**
 * Return database schema for states information.
 * @param db
 * @param mongoose
 * @returns {*|Model}
 */
module.exports = function (db, mongoose) {
    return db.model('StatesInfo', {label: String, value: Number}, 'StatesInfo');

}
