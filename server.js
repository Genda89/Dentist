const express=require('express')
const app=express()
const port=8080
const ejs=require('ejs')

//build database connection details
const mysql = require('mysql');
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dentist',
    port: 3306
});
db.connect();


//let express the public content folder
app.use(express.static(__dirname + '/public'));

//build basic routing
app.get('/',function(require,response){
    response.sendFile('index.html')
})

//build about routing
app.get('/about',function(require,response){
    response.send('This is me.')
})

//parse request to json
var bodyParser = require('body-parser');
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


//send sql queries to mysql
app.post('/send_to_database',function(req,res){
    
    let sqlQuery="INSERT INTO dentist.patients (Surname, Firstname,Town,SSC) VALUES ('"+req.body['surname']+"','"+req.body['firstname']+"','"+req.body['town']+"','"+req.body['ssc']+"')"
    db.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.redirect('/#newpatient')
})

//get data from mysql
app.get('/find_patient',function(req,res){
    res.setHeader("Content-Type", "application/json")
    let sqlQuery="SELECT * FROM dentist.patients WHERE Surname='"+req.body['surname']+"'"
    +"OR Firstname='"+req.body['firstname']+"'"
    +"OR Town='"+req.body['town']+"'"
    +"OR SSC='"+req.body['ssc']+"'"
    
    db.query(sqlQuery, function (err, result) {
        return res.end({'lol':'oll'})
    })
})






//listen on port
app.listen(port,function(error){
    if(error){
        console.log('Server is not running.')
    }else{
        console.log('Server is running properly.')
    }
})