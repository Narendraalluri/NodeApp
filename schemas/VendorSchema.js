/**
 * Vendor db schema.
 * @param db
 * @param mongoose
 * @returns {*|Model}
 */
module.exports = function (db, mongoose) {

    var VendorContactInfo = new mongoose.Schema({
        contactName: {type: String, required: true},
        contactPhNum: {type: String, required: true},
        emailID: {type: String, required: true}
    });

    var VendorInfoSchema = new mongoose.Schema({
        vendorName: {type: String, required: true},
        vendorAddress1: {type: String, required: true},
        vendorAddress2: {type: String},
        vendorCityName: {type: String, required: true},
        vendorStateIndex: {type: Number, required: true},
        vendorZipCode: {type: Number, required: true},
        vendorContactDetail: [VendorContactInfo]
    });

    return db.model('VendorInfo', VendorInfoSchema, 'VendorInfo');

}