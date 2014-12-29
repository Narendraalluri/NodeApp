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
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));


var mongoose = require('mongoose');
//mongoose.connect('mongodb://root:FbVQsj0Zx2LW@localhost/admin');

mongoose.connect('mongodb://localhost/TimeSheetDB');


var fs = require('fs');
var timeSheet = mongoose.model('TimeSheet', { clientApproved: String , name: String , startDate : String, endDate : String, monday : String, tuesday : String, wednesday : String, thursday : String, friday : String, saturday : String, sunday : String,  content : Buffer, originalName: String, status : Number, createDate : Date });

var user = mongoose.model('User', { firstName: String , lastName : String, email : String, password : String, role : String});

app.get('/viewTimesheets', function(req, res) {
console.log("In View TimeSheet")
    userId = req.session.loggedInId
    if(req.query != null && req.query.id != null){
        userId = req.query.id
        console.log(req.query.id)
    }

    console.log(userId)

    date3Months = new Date();
    date3Months.setMonth(date3Months.getMonth() - 3)
    timeSheet.find({'name': userId, 'createDate' : {  '$gt': date3Months } },'clientApproved name originalName startDate endDate monday tuesday wednesday thursday friday saturday sunday _id status', function(err, data) {

        res.json(data);

    });
});

app.get('/deleteUser', function(req, res) {

    console.log(req.query.id)

    user.findByIdAndRemove(req.query.id, function(err, data) {

        res.sendfile(html_dir + '/Users.html');

    });
});

app.post('/updateUser', function(req, res) {

    console.log("Update User "+req.body.id)

        user.findByIdAndUpdate(req.body.id, { $set: {  firstName: req.body.firstName,lastName: req.body.lastName,email: req.body.tuesday,email: req.body.role }}, function (err, tank) {
          res.sendfile(html_dir + '/Users.html');

         

        });

});


app.get('/showUsers', function(req, res) {
    user.find({}, function(err, data) {

        res.json(data);

    });
});

app.get('/editUser', function(req, res) {
    console.log(req.query.id)
    user.findById(req.query.id, function(err, data) {

        res.json(data);

    });
});

app.get('/deleteTimeSheet', function(req, res) {

    console.log(req.query.id)

    timeSheet.findByIdAndRemove(req.query.id, function(err, data) {

        res.sendfile(html_dir + '/viewTimeSheets.html');

    });
});




app.post('/updateTimesheet', function(req, res) {

    
    var ts = new timeSheet;
    try{
        var tmp_path = req.files.timesheet.path;
    fs.readFile(tmp_path, function(err, data){
        console.log("before")
        timeSheet.findByIdAndUpdate(req.body.id, { $set: { clientApproved: req.body.clientApproved, originalName: req.files.timesheet.originalname, content: data, sunday: req.body.sunday,monday: req.body.monday,tuesday: req.body.tuesday,wednesday: req.body.wednesday,thursday: req.body.thursday,friday: req.body.friday,saturday: req.body.saturday }}, function (err, tank) {
console.log("After")
          fs.unlink(tmp_path, function(err) {
                res.sendfile(html_dir + '/viewTimeSheets.html');
                //res.send('File uploaded to: ' + target_path + ' - ' + req.files.timesheet.size + ' bytes');
            });

        });
        
    });
}catch(e){
        
        timeSheet.findByIdAndUpdate(req.body.id, { $set: {  clientApproved: req.body.clientApproved,sunday: req.body.sunday,monday: req.body.monday,tuesday: req.body.tuesday,wednesday: req.body.wednesday,thursday: req.body.thursday,friday: req.body.friday,saturday: req.body.saturday }}, function (err, tank) {
          res.sendfile(html_dir + '/viewTimeSheets.html');

         

        });

}



});

app.get('/editTimesheet', function(req, res) {
    console.log(req.query.id)
    timeSheet.findById(req.query.id, function(err, data) {

        res.json(data);

    });
});

app.get('/showOptions', function(req, res) {
    if(req.session.loggedInRole == 'admin')
        data = [{name:"Add Employees", link: "createUser.html"},{name:"View Employees", link : "Users.html"}]
    else
        data = [{name:"Create TimeSheet", link: "createTimeSheet.html"},{name:"View TimeSheets", link : "viewTimeSheets.html"}]
    res.json(data);
});

app.get('/getLoggedInUser', function(req, res) {
   
    data = {userFirstName: req.session.loggedInUserData.firstName }
    res.json(data);
});

app.post('/loginUser', function(req, res) {
    console.log(req.body)
    user.findOne({email : req.body.email, password : req.body.password}, function(err, data) {
console.log(data)
    if (data == null) {
        res.sendfile(html_dir + '/loginfailed.html');;
    }
    else{
        req.session.loggedInUser = req.body.email;
        req.session.loggedInRole = data.role
        req.session.loggedInId = data._id
        req.session.loggedInUserData = data
       res.sendfile(html_dir + '/userWelcome.html');
    }
        
    });
        

});



app.get('/showFile', function(req, res) {
    timeSheet.findOne({_id : req.query.id}, function(err, data) {

        res.setHeader('Content-disposition', 'attachment; filename='+req.query.originalName);
        //res.contentType('application/vnd.ms-excel');
        res.send(data.content);
        
    });
        

});

app.post('/addUser', function(req, res) {
    var newUser = new user;
    console.log(req.body)
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.role = req.body.role;
    newUser.save(function (err) {
            if (err) // ...
                console.log(err);
           

    });

    res.sendfile(html_dir + '/Users.html');
});


app.post('/addTimeSheet', function(req, res) {
    // get the temporary location of the file
    var tmp_path = req.files.timesheet.path;
    // set where the file should actually exists - in this case it is in the "images" directory
   // var target_path = './uploads/timesheet_' + req.body.username+'.png';
    // move the file from the temporary location to the intended location

    
    var ts = new timeSheet;
    fs.readFile(tmp_path, function(err, data){
        ts.name = req.session.loggedInId;
        ts.startDate = req.body.startDate;
        ts.endDate = req.body.endDate;
        ts.monday = req.body.monday;
        ts.tuesday = req.body.tuesday;
        ts.wednesday = req.body.wednesday;
        ts.thursday = req.body.thursday;
        ts.friday = req.body.friday;
        ts.saturday = req.body.saturday;
        ts.sunday = req.body.sunday;
        ts.clientApproved = req.body.clientApproved;
        ts.createDate = new Date();
        ts.status = 0;
        ts.content = data;
        ts.originalName = req.files.timesheet.originalname;
        ts.save(function (err) {
            if (err) // ...
                console.log(err);

            fs.unlink(tmp_path, function(err) {
                if (err) throw err;
                res.sendfile(html_dir + '/userWelcome.html');
                //res.send('File uploaded to: ' + target_path + ' - ' + req.files.timesheet.size + ' bytes');
            });


        });
    });

});
var server = app.listen(8000, function () {
    console.log('listening on port %d', server.address().port);
});