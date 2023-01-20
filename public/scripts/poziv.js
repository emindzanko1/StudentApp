// callback funkcije

function login(error, data) {
  if (error == null) {
    let obj = JSON.parse(data);
    window.location.assign(obj.url);
  }
}

function logout(error, data) {
  if (error == null) {
    let obj = JSON.parse(data);
    window.location.assign(obj.url);
  }
}

function predmeti(error, data) {
  if (error == null) {
    let lista_predmeta = JSON.parse(data);
    if (lista_predmeta.hasOwnProperty("greska")) {
      var greska = document.createElement("p");
      greska.innerHTML = lista_predmeta.greska;
      document.getElementById("meni").appendChild(greska);
    } else {
      var list = document.createElement("ul");
      list.style.lineHeight = "2";
      for (let elem of lista_predmeta) {
        var item = document.createElement("li");
        item.innerHTML = elem;
        item.id = elem;
        item.onclick = function() {
          getPredmet(elem)
        };
        list.appendChild(item);
      }
      document.getElementById("meni").appendChild(list);
    }
  }
}

function predmet(error, data) {
  if (error == null) {
    //generateTable(JSON.parse(data));
    //console.log(JSON.parse(data));
    createTable(JSON.parse(data));
  }
}

function izmijeniPrisustvo(error, data) {
  if (error == null) {
    console.log(JSON.parse(data));
    createTable(JSON.parse(data));
  }
}

// helper funkcije

function isloggedin(error, data) {
  if (error == null) {
    var dugme = document.getElementById("logoutdugme");
    if (data == "false") {
      dugme.style.visibility = "hidden";
    }
  }
}

function predmetiInit() {
  getPredmeti();
  getLoggedIn();
}

let numerals = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const convertToRoman = (num) => {
  let newNumeral = "";

  for (let i in numerals) {
    while (num >= numerals[i]) {
      newNumeral += i;
      num -= numerals[i];
    }
  }

  return newNumeral;
}

let createTitle = function(prisustva) {

  var h1 = document.createElement("h1");
  h1.innerHTML = prisustva.predmet;
  document.body.appendChild(h1);
  this.divRef.appendChild(h1);
}

let calculatePercentage = function(prisustvo, prisustva) {

  var brojPredavanjaSedmicno = prisustvo.predavanja;
  var brojVjezbiSedmicno = prisustvo.vjezbe;

  var procenat = (brojPredavanjaSedmicno + brojVjezbiSedmicno) / (prisustva.brojPredavanjaSedmicno + prisustva.brojVjezbiSedmicno) * 100;

  return Math.round(procenat * 100) / 100;

}

let colorTheTilePredavanja = function(prisustva, brojPrisustva, k) {
  var ukupnoPredavanja = prisustva.brojPredavanjaSedmicno;
  if (ukupnoPredavanja == brojPrisustva) {
    return true;
  } else if (brojPrisustva < ukupnoPredavanja) {
    if (k < brojPrisustva) {
      return true;
    } else {
      return false;
    }
  }
}


let colorTheTileVjezbe = function(brojPrisustva, prisustva, k) {
  var ukupnoPredavanja = prisustva.brojVjezbiSedmicno;
  if (ukupnoPredavanja == brojPrisustva) {
    return true;
  } else if (brojPrisustva < ukupnoPredavanja) {
    if (k - prisustva.brojPredavanjaSedmicno < brojPrisustva) {
      return true;
    } else {
      return false;
    }
  }
}

let createTable = function(prisustva) {
  // creates a <table> element and a <tbody> element

  let element = document.getElementById("tabela");
  if (element) {
    element.remove();
  }
  //console.log(prisustva.prisustva);

  const table = document.createElement("table");
  table.id = "tabela";

  table.style.border = "1px solid black";
  table.style.border.collapse = "collapse";
  table.style.height = "100%";
  table.style.width = "60%";
  table.style.margin.left = "auto";
  table.style.margin.right = "auto";
  table.style.wordwrap = "break-word";
  table.style.background = "#F5EDDC";

  const tblBody = document.createElement("tbody");

  var brojsedmica = prisustva.prisustva.length / prisustva.studenti.length;
  var tr = document.createElement('tr');

  for (var j = 0; j < brojsedmica + 3; j++) {
    var headerCell = document.createElement("th");
    headerCell.style.background = "#A2B5BB";
    switch (j) {
      case 0:
        headerCell.innerHTML = "Ime i prezime";
        tr.appendChild(headerCell);
        break;
      case 1:
        headerCell.innerHTML = "Index";
        tr.appendChild(headerCell);
        break;
      case brojsedmica + 2:
        headerCell.innerHTML = convertToRoman(j - 1) + "-" + convertToRoman(15);
        tr.appendChild(headerCell);
        break;
      default:
        headerCell.innerHTML = convertToRoman(j - 1);
        tr.appendChild(headerCell);
        break;
    }
  }

  table.appendChild(tr);

  for (let i = 0; i < prisustva.studenti.length; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < brojsedmica + 3; j++) {

      const cell = document.createElement("td");
      switch (j) {
        case 0:
          cell.innerHTML = prisustva.studenti[i].ime;
          break;
        case 1:
          cell.innerHTML = prisustva.studenti[i].index;
          break;
        case prisustva.prisustva.length / prisustva.studenti.length + 1:
          let tip = "";
          for (let l = 0; l < 2; l++) {
            const inner_row = document.createElement("tr");

            for (let k = 0; k < prisustva.brojPredavanjaSedmicno + prisustva.brojVjezbiSedmicno; k++) {
              const inner_cell = document.createElement("td");
              inner_cell.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
              const cellText = document.createTextNode("cell in row " + l + ", column " + k);

              if (l == 0) {
                if (k < prisustva.brojPredavanjaSedmicno) {
                  inner_cell.innerHTML = "P" + (k + 1);

                } else {
                  inner_cell.innerHTML = "V" + (k - prisustva.brojPredavanjaSedmicno + 1);

                }
              } else {
                if (k < prisustva.brojPredavanjaSedmicno) {
                  if (colorTheTilePredavanja(prisustva, prisustva.prisustva[i + 30].predavanja, k)) {
                    inner_cell.style.background = "#9CFF2E";
                    boja = "zelena";
                    inner_cell.tip = "predavanja";

                  } else {
                    inner_cell.style.background = "#E0144C";
                    boja = "crvena";
                    inner_cell.tip = "predavanja";
                  }
                } else {
                  if (colorTheTileVjezbe(prisustva.prisustva[i + 30].vjezbe, prisustva, k)) {
                    inner_cell.style.background = "#9CFF2E";
                    boja = "zelena";
                    inner_cell.tip = "vjezbe";
                  } else {
                    inner_cell.style.background = "#E0144C";
                    boja = "crvena";
                    inner_cell.tip = "vjezbe";
                  }
                }
              }

              inner_cell.onclick = function() {
                //console.log(i);
                predavanja = prisustva.prisustva[i].predavanja;
                vjezbe = prisustva.prisustva[i].vjezbe;


                let celija = document.getElementById(inner_cell.id);
                //console.log(celija.tip);

                // if (celija.style.background == "rgb(156, 255, 46)") {
                //   if (celija.tip == "predavanja") {
                //     predavanja = predavanja - 1;
                //   } else if (celija.tip == "vjezbe") {
                //     vjezbe = vjezbe - 1;
                //   }
                // } else {
                //   if (celija.tip == "predavanja") {
                //     predavanja = predavanja + 1;
                //   } else if (celija.tip == "vjezbe") {
                //     vjezbe = vjezbe + 1;
                //   }
                // }
                postPrisustvo(prisustva.predmet, prisustva.studenti[i].index, {
                  sedmica: j - 1,
                  predavanja: predavanja,
                  vjezbe: vjezbe
                });
              }
              //cell.appendChild(cellText);
              inner_row.appendChild(inner_cell);
            }

            cell.appendChild(inner_row);
          }


          //cell.innerHTML = row;
          break;
        case brojsedmica + 2:
          cell.innerHTML = "";
          break;
        default:
          cell.innerHTML = calculatePercentage(prisustva.prisustva[i + (j - 2) * 2], prisustva) + "%";
          break;
      }

      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  table.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(table);
  // sets the border attribute of tbl to '2'
  table.setAttribute("border", "2");
}

let generateTable = function(prisustva) {
  let element = document.getElementById("tabela");
  if (element) {
    element.remove();
  }
  var table = document.createElement('table');
  table.style.border = "1px solid black";
  table.style.border.collapse = "collapse";
  table.style.height = "100%";
  table.style.width = "60%";
  table.style.margin.left = "auto";
  table.style.margin.right = "auto";
  table.style.wordwrap = "break-word";
  table.style.background = "#F5EDDC";

  var brojsedmica = prisustva.prisustva.length / prisustva.studenti.length;
  var tr = document.createElement('tr');

  for (var j = 0; j < brojsedmica + 3; j++) {
    var headerCell = document.createElement("th");
    headerCell.style.background = "#A2B5BB";
    switch (j) {
      case 0:
        headerCell.innerHTML = "Ime i prezime";
        tr.appendChild(headerCell);
        break;
      case 1:
        headerCell.innerHTML = "Index";
        tr.appendChild(headerCell);
        break;
      case brojsedmica + 2:
        headerCell.innerHTML = convertToRoman(j - 1) + "-" + convertToRoman(15);
        tr.appendChild(headerCell);
        break;
      default:
        headerCell.innerHTML = convertToRoman(j - 1);
        tr.appendChild(headerCell);
        break;

    }
  }
  table.appendChild(tr);
  for (var i = 0; i < prisustva.studenti.length; i++) {

    var tr = document.createElement('tr');
    var tdElement = document.createElement('td');
    for (var j = 0; j < brojsedmica + 3; j++) {
      switch (j) {
        case 0:
          var tdElement = document.createElement('td');
          tdElement.innerHTML = prisustva.studenti[i].ime;
          tr.appendChild(tdElement);
          break;
        case 1:
          var tdElement = document.createElement('td');
          tdElement.innerHTML = prisustva.studenti[i].index;
          index = prisustva.studenti[i].index;
          tr.appendChild(tdElement);
          break;
        case brojsedmica + 2:
          var tdElement = document.createElement('td');
          tr.appendChild(tdElement);
          break;
        case prisustva.prisustva.length / prisustva.studenti.length + 1:
          var tdElement = document.createElement('td');
          for (var l = 0; l < 2; l++) {
            var inner_tr = document.createElement('tr');
            for (var k = 0; k < prisustva.brojPredavanjaSedmicno + prisustva.brojVjezbiSedmicno; k++) {
              var inner_td = document.createElement('td');
              inner_td.style.width = "23%";
              inner_td.onclick = function() {
                //console.log(prisustva.predmet, index, j, predavanja, vjezbe); zakom 15:54
                //postPrisustvo(prisustva.predmet, prisustva.studenti[i].index, {sedmica: j, predavanja: prisustva.prisustva[i + 2].predavanja, vjezbe: prisustva.prisustva[i + 2].vjezbe});
              }
              if (l == 0) {
                if (k < prisustva.brojPredavanjaSedmicno) {
                  inner_td.innerHTML = "P" + (k + 1);
                } else {
                  inner_td.innerHTML = "V" + (k - prisustva.brojPredavanjaSedmicno + 1);
                }
              } else {
                if (k < prisustva.brojPredavanjaSedmicno) {
                  if (colorTheTilePredavanja(prisustva, prisustva.prisustva[i + 2].predavanja, k)) {
                    inner_td.style.background = "#9CFF2E";
                  } else {
                    inner_td.style.background = "#E0144C";
                  }
                } else {
                  if (colorTheTileVjezbe(prisustva.prisustva[i + 2].vjezbe, prisustva, k)) {
                    inner_td.style.background = "#9CFF2E";
                  } else {
                    inner_td.style.background = "#E0144C";
                  }
                }
              }
              inner_tr.style.layout = "auto";
              inner_tr.appendChild(inner_td);
            }
            tr.appendChild(inner_tr);
          }
          break;
        default:
          var tdElement = document.createElement('td');
          tdElement.innerHTML = calculatePercentage(prisustva.prisustva[i + (j - 2) * 2], prisustva) + "%";
          tr.appendChild(tdElement);
          break;
      }
      table.appendChild(tr);
    }
  }
  table.id = "tabela";
  document.getElementById("body").appendChild(table);
  table.setAttribute("border", "2");
}

// Ajax pozivi

function submitLogin() {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  PoziviAjax.postLogin(username, password, login);
}

function getPredmeti() {
  PoziviAjax.getPredmeti(predmeti);
}

function getLoggedIn() {
  PoziviAjax.getLoggedIn(isloggedin);
}

function postLogOut() {
  PoziviAjax.postLogout(logout);
}

function getPredmet(naziv) {
  PoziviAjax.getPredmet(naziv, predmet);
}

function postPrisustvo(naziv, index, prisustvo) {
  PoziviAjax.postPrisustvo(naziv, index, prisustvo, izmijeniPrisustvo);
}
