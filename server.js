var express = require('express'),
    app = express();

var bodyParser = require('body-parser');
var fs = require('fs');
var multer  = require('multer')
app.use(multer({ dest: './uploads/'}))

var html_dir = __dirname + '/static';
app.use(express.static(html_dir));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mongoose = require('mongoose');
mongoose.connect('mongodb://root:FbVQsj0Zx2LW@localhost/admin');

//mongoose.connect('mongodb://localhost/TimeSheetSB');


var fs = require('fs');
var timeSheet = mongoose.model('TimeSheet', { name: String , startDate : String, monday : String, tuesday : String, wednesday : String, thursday : String, friday : String, saturday : String, sunday : String,  content : Buffer, originalName: String});

app.get('/showTimesheets', function(req, res) {
    timeSheet.find({},'name originalName startDate monday tuesday wednesday thursday friday saturday sunday _id', function(err, data) {

        res.json(data);

    });
});

app.get('/showFile', function(req, res) {
    timeSheet.findOne({_id : req.query.id}, function(err, data) {

        res.setHeader('Content-disposition', 'attachment; filename='+req.query.originalName);
        //res.contentType('application/vnd.ms-excel');
        res.send(data.content);
        
    });
        

    });


app.post('/file-upload', function(req, res) {
    // get the temporary location of the file
    var tmp_path = req.files.timesheet.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './uploads/timesheet_' + req.body.username+'.png';
    // move the file from the temporary location to the intended location

    
    var ts = new timeSheet;
    fs.readFile(tmp_path, function(err, data){
        ts.name = req.body.username;
        ts.startDate = req.body.startDate;
        ts.monday = req.body.monday;
        ts.tuesday = req.body.tuesday;
        ts.wednesday = req.body.wednesday;
        ts.thursday = req.body.thursday;
        ts.friday = req.body.friday;
        ts.saturday = req.body.saturday;
        ts.sunday = req.body.sunday;
        ts.content = data;
        ts.originalName = req.files.timesheet.originalname;
        ts.save(function (err) {
            if (err) // ...
                console.log(err);

            fs.unlink(tmp_path, function(err) {
                if (err) throw err;
                res.sendfile(html_dir + '/index.html');
                //res.send('File uploaded to: ' + target_path + ' - ' + req.files.timesheet.size + ' bytes');
            });


        });
    });

});


var server = app.listen(8000, function () {
    console.log('listening on port %d', server.address().port);
});