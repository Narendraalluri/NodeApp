module.exports = function (VendorSchemaModal) {

    return {
        /**
         * Get all vendors
         * @param req
         * @param res
         */
        getAllVendors: function (req, res) {
            VendorSchemaModal.find({},'',function(req, data){
                res.json(data);
            });
        },


        /**
         * Save vendor
         * @param req
         * @param res
         */
        addNewVendor: function (req, res) {
            var vendorInfo                  = new VendorSchemaModal;
            vendorInfo.vendorName           = req.body.vendorName;
            vendorInfo.vendorAddress1       = req.body.vendorAddr1;
            vendorInfo.vendorAddress2       = req.body.vendorAddr2;
            vendorInfo.vendorCityName       = req.body.vendorCityName;
            vendorInfo.vendorStateIndex     = req.body.vendorState;
            vendorInfo.vendorZipCode        = req.body.vendorZipCode;
            vendorInfo.vendorContactDetail  = req.body.vendorContactDetails;

            console.log("Adding vendor details to the db : " + vendorInfo);

            vendorInfo.save(function(err){
                if (!err){
                    res.json({"successValue":"true"});
                    return console.log("successfully saved the vendorinfo to db : ");
                }else{
                    res.json({"successValue":"false"});
                    return console.log("Unable to save the vendor info to db");
                }
            });
        }


    }


}