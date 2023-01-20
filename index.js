const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
var port = process.env.PORT || 3000;

//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'secret',
  resave: 'true',
  saveUninitialized: 'true'
}));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, 'public/html')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/images')));
app.use(express.static(path.join(__dirname, '/public/scripts')));

app.get('/isloggedin', function(req, res) {

  if (req.session.loggedIn == true) {
    res.send(req.session.loggedIn);
  } else res.send(false);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/html/prijava.html'));
  //let username = req.session.username;
  //console.log(username);

  //console.log(__dirname);
});

app.get('/predmeti', function(req, res) {
  //
  let loggedIn = false;

  if (req.session.loggedIn == true) {
    loggedIn = true;
  }

  if (loggedIn) {
    res.send(req.session.predmeti);
    //res.sendFile(path.join(__dirname, '/public/html/predmeti.html'));
    // res.send();

  } else {
    res.send({
      "greska": "Nastavnik nije loginovan"
    });
  }

});

app.post('/login', function(req, res) {

  bcrypt.hash(req.body.password, 10, function(err, hash) {

    let jsonData = require('./data/nastavnici.json');

    let username = req.body.username;
    let password = req.body.password;


    let predmeti = {};

    let prijava = false;

    let i = 0;

    if (username && password) {
      //for (i = 0; i < jsonData.length; i++) {

      while (i != jsonData.length) {

        if (jsonData[i].nastavnik.username == username) {
          prijava = true;
          let l = i;
          bcrypt.compare(password, jsonData[l].nastavnik.password_hash, function(err, result) {
            if (result) {
              predmeti = jsonData[l].predmeti;
              req.session.loggedIn = true;
              req.session.username = username;
              req.session.predmeti = predmeti;

              //console.log("poruka:Uspjesna prijava");
              res.json({
                poruka: "Uspjesna prijava",
                url: "/predmeti.html"
              });
            } else {

              console.log("poruka:Neuspjesna prijava")

              //res.send({"poruka":"Neuspjesna prijava"});
              //res.redirect('/');
            }

          });
        }
        i++;
      }
    }

    if (!prijava)
      console.log("poruka:Neuspjesna prijava")


    /*if (prijava) {
      predmeti = jsonData[i].predmeti;
      req.session.loggedIn = true;
      req.session.username = username;
      req.session.predmeti = predmeti;

      //console.log("poruka:Uspjesna prijava");
      res.json({
        poruka: "Uspjesna prijava",
        url: "/predmeti.html"
      });
    } else {
      //res.send({"poruka":"Neuspjesna prijava"});
      //res.redirect('/');
      console.log("poruka:Neuspjesna prijava")

    }*/
  });
});

app.get('/predmeti', function(req, res) {

  //
  let loggedIn = false;

  if (req.session.loggedIn == true) {
    loggedIn = true;
  }

  if (loggedIn) {
    res.send(req.session.predmeti);
    //res.sendFile(path.join(__dirname, '/public/html/predmeti.html'));
    // res.send();
  } else {
    res.send({
      "greska": "Nastavnik nije loginovan"
    });
  }

});

app.post('/logout', function(req, res) {

  delete req.session.username;
  delete req.session.predmeti;
  req.session.loggedIn = false;
  res.json({
    poruka: "Korisnik je izlogovan",
    url: "/prijava.html"
  });

});

app.get('/predmet/:naziv', function(req, res) {
  let naziv = req.params.naziv;

  let prisustva = require('./data/prisustva.json');

  for (predmet of prisustva) {
    if (predmet.predmet.toString() == naziv) {
      res.json(predmet);
    }
  }

});

app.post('/prisustvo/predmet/:naziv/student/:index', function(req, res) {
  let naziv = req.params.naziv;
  let index = req.params.index;

  let sedmica = parseInt(req.body.sedmica);
  let predavanja = parseInt(req.body.predavanja);
  let vjezbe = parseInt(req.body.vjezbe);

  let prisustva = require('./data/prisustva.json');
  for (predmet of prisustva) {
    if (predmet.predmet.toString() == naziv) {
      for (prisustvo of predmet.prisustva) {

        if (parseInt(prisustvo.sedmica) == sedmica && prisustvo.index.toString() == index) {
          //console.log(prisustvo);
          prisustvo.predavanja = predavanja;
          prisustvo.vjezbe = vjezbe;
          res.json(predmet);
        }
      }
    }
  }
});

app.listen(port, function() {
  console.log("Listening on " + port);
});
