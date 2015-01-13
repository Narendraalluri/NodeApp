

module.exports = function (app, options) {

    var mongoose = options.mongoose;
    var Schema = options.mongoose.Schema;
    var db = options.db;
    var commonApi = options.commonApi;

    var clientServiceModal = require('../schemas/ClientSchema')(db, mongoose);
    var clientServiceImpl = require('../controllers/clientServiceController')(clientServiceModal);
    var StatesServiceImpl = require('../controllers/statesInfoServiceController')(commonApi.StatesSchema);

    app.get('/getAllStates', StatesServiceImpl.getAllStates);
    app.post('/addNewClient', clientServiceImpl.addNewClient);
    app.get('/getAllClients', clientServiceImpl.getAllClients);
}
