var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');

var sendEmail = require('./mail.js');

var app = express();

var port = 3000;

var config = {
    apiKey: "AIzaSyB-D30973UOGMHxkHxsIsz4QqXmMr3ikQI",
    authDomain: "user-project-ec48c.firebaseapp.com",
    databaseURL: "https://user-project-ec48c.firebaseio.com",
    projectId: "user-project-ec48c",
    storageBucket: "user-project-ec48c.appspot.com",
    messagingSenderId: "812920421843"
  };
firebase.initializeApp(config);

var ref = firebase.app().database().ref();
var usersInfoRef = ref.child('usersInformation');
var usersRef = ref.child('users');

app.use(bodyParser.json());

app.post('/add', (req, res) => {
    var user = usersRef.push({
                name: req.body.name,
                email: req.body.email
            });
    var userInfo = usersInfoRef.push({
                name: req.body.name,
                email: req.body.email
            });
    if(user)
    {
        sendEmail(req.body.email, req.body.name);
        res.status(200).send(user);
    }
});

//array-format
// app.get('/fetch', (req, res) => {
//     usersRef.on('value', snap =>  {
//         var names = [];
//         snap.forEach(name => {
//            names.push(name.child('name').val());
//         });
//         res.status(200).send(names);
//      });
// });

app.get('/fetch', (req, res) => {
    usersRef.on('value', snap =>  {
        res.status(200).send(snap.val());
    });      
});

app.get('/', (req, res) => {
    res.send({
        message: "welcome to node-firebase app"
    });
});

app.listen(port);