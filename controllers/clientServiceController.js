module.exports = function (clientServiceModal) {
    return {

        /**
         * Add New Clients
         * @param req
         * @param res
         */
        addNewClient: function (req, res) {

            var clientInfo = new clientServiceModal;

            clientInfo.clientName = req.body.clientName;
            clientInfo.clientAddress1 = req.body.clientAddress1;
            clientInfo.clientAddress2 = req.body.clientAddress2;
            clientInfo.clientCityName = req.body.clientCityName;
            clientInfo.clientStateIndex = req.body.clientStateIndex;
            clientInfo.clientZipCode = req.body.clientZipCode;
            clientInfo.vendorID = req.body.vendorID;
            console.log("Adding client details to db : " + clientInfo);
            clientInfo.save(function (err) {
                if (!err) {
                    res.json({"isSuccess": "true"});
                } else {
                    console.log(err);
                    res.json({"isSuccess": "false"});
                }
            });
        },

        /**
         * Get all clients
         * @param req
         * @param res
         */
        getAllClients: function (req, res) {
            clientServiceModal.find().populate('vendorID', 'vendorName').exec(function (err, data) {
                if (!err) {
                    res.json({"isSuccess": "true", responseData: data});
                } else {
                    console.log("Unable to fetch clients information : " + err);
                    res.json({"isSuccess": "false"});
                }
            });
        }


    }
}