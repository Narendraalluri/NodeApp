

module.exports = function (app, options) {

    var mongoose = options.mongoose;
    var Schema = options.mongoose.Schema;
    var db = options.db;
    var commonApi = options.commonApi;

    var VendorSchema = require('../schemas/VendorSchema')(db, mongoose);
    var VendorServiceImpl = require('../controllers/vendorInfoServiceController')(VendorSchema);

    var StatesServiceImpl = require('../controllers/statesInfoServiceController')(commonApi.StatesSchema);


    app.get('/getAllStates', StatesServiceImpl.getAllStates);

    app.post('/addNewVendor', VendorServiceImpl.addNewVendor);

    app.get('/getAllVendors', VendorServiceImpl.getAllVendors);

};
