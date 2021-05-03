const http = require('http');
const fs = require('fs');
const firebase = require('./firebase');

const express = require("express");
const app  = require("express")();

app.use(express.static('./script'));

var admin = require("firebase-admin");
var serviceAccount = require("./five-seven-five-93ee2-firebase-adminsdk-q2lof-71c98e5a90.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
var test1 = [];
db.collection('messages').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            test1.push(doc.data());
        });
        console.log(test1);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });


const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            fs.readFile('./index.html', 'UTF-8',
            function(err, data) {
                if(err) {
                    console.log(err);
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                const data2 = data.replace(/@messages/g, test1);
                res.write(data2);
                res.end();
            });
            break;

        case '/firebase.js':
            fs.readFile('./firebase.js', 'UTF-8',
            function(err, data) {
                if(err) {
                    console.log(err);
                }
                res.writeHead(200, {'Content-Type': 'text/javascript'});
                res.write(data);
                res.end();
            });
            break;

        default:
            break;
    }
});

const port = 8080;
server.listen(port);
console.log('Server listen on port ' + port);