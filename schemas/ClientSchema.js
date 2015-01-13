/**
 * Client Schema definition.
 * @param db
 * @param mongoose
 */

module.exports = function (db, mongoose) {

    var ClientInfoSchema = new mongoose.Schema({
        clientName: {type: String, required: true},
        clientAddress1: {type: String, required: true},
        clientAddress2: {type: String, required: true},
        clientCityName: {type: String, required: true},
        clientStateIndex: {type: String, required: true},
        clientZipCode: {type: String, required: true},
        vendorID: {type: mongoose.Schema.ObjectId, ref: 'VendorInfo'}
    });

    return db.model('ClientsInfo', ClientInfoSchema, 'ClientsInfo');

};