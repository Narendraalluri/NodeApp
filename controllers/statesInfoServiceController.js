module.exports = function (StateSchemaModal) {
    return {
        getAllStates: function (req, res) {
            StateSchemaModal.find({}, function (err, data) {
                if (!err) {
                    console.log("States data : " + data);
                    res.send({
                        "status": true,
                        "resultData": data
                    });
                } else {
                    console.log("Unable to get the states information : " + err);
                    res.send({
                        "status": false
                    });
                }
            });
        }
    }
}