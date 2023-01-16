const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const path = require('path');
const app = express();
var port = process.env.PORT || 3000;

//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret:'secret',
  resave:'true',
  saveUninitialized:'true'
}));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname,'public/html')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/images')));
app.use(express.static(path.join(__dirname, '/public/scripts')));


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/html/prijava.html'));
  //let username = req.session.username;
  //console.log(username);

  //console.log(__dirname);
});

app.get('/predmeti', function(req, res){


   //
   let loggedIn = false;

   if(req.session.loggedIn == true) {
      loggedIn = true;
   }

   if(loggedIn) {
     res.send(req.session.predmeti);
     //res.sendFile(path.join(__dirname, '/public/html/predmeti.html'));
    // res.send();

   }
   else {
     res.send({"greska":"Nastavnik nije loginovan"});
   }

});

app.post('/login', function(req, res){

  console.log(req.body);
  let jsonData = require('./data/nastavnici.json');

  let username = req.body.username;
  let password = req.body.password;

  let predmeti = {};

  let prijava = false;

  if(username && password) {
    for(i = 0; i < jsonData.length; i++) {
       if(jsonData[i].nastavnik.username == username && jsonData[i].nastavnik.password_hash == password) {
        prijava = true;
        predmeti = jsonData[i].predmeti;
       }
    }
  }

  if(prijava) {
    req.session.loggedIn = true;
    req.session.username = username;
    req.session.predmeti = predmeti;

    //console.log("poruka:Uspjesna prijava");
    res.json({poruka:"Uspjesna prijava",url:"/predmeti"});
  }
  else {
    //res.send({"poruka":"Neuspjesna prijava"});
    //res.redirect('/');
   console.log("poruka:Neuspjesna prijava")

  }
});

app.get('/predmeti', function(req, res){


   //
   let loggedIn = false;

   if(req.session.loggedIn == true) {
      loggedIn = true;
   }

   if(loggedIn) {
     res.send(req.session.predmeti);
     //res.sendFile(path.join(__dirname, '/public/html/predmeti.html'));
    // res.send();

   }
   else {
     res.send({"greska":"Nastavnik nije loginovan"});
   }

});

app.get('/logout', function(req, res){
  delete req.session.username;
  delete req.session.predmeti;
  req.session.loggedIn = false;
  res.sendFile(path.join(__dirname + '/public/html/prijava.html'));
});

app.listen(port, function() {
  console.log("Listening on " + port);
});