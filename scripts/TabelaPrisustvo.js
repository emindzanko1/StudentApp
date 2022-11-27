//document.body.innerHTML = '';
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

let TabelaPrisustvo = function(divRef, podaci) {

  this.divRef = divRef;
  this.podaci = podaci;


  let createTitle = function() {

    var h1 = document.createElement("h1");
    h1.innerHTML = this.podaci.predmet;
    document.body.appendChild(h1);
    this.divRef.appendChild(h1);

  }

  let calculatePercentage = function(prisustvo) {

    var brojPredavanjaSedmicno = prisustvo.predavanja;
    var brojVjezbiSedmicno = prisustvo.vjezbe;

    var procenat = (brojPredavanjaSedmicno + brojVjezbiSedmicno) / (this.podaci.brojPredavanjaSedmicno + this.podaci.brojVjezbiSedmicno) * 100;

    return procenat;
  }

  let colorTheTilePredavanja = function(brojPrisustva, k) {
    var ukupnoPredavanja = this.podaci.brojPredavanjaSedmicno;
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

  let colorTheTileVjezbe = function(brojPrisustva, k) {
    var ukupnoPredavanja = this.podaci.brojVjezbiSedmicno;
    if (ukupnoPredavanja == brojPrisustva) {
      return true;
    } else if (brojPrisustva < ukupnoPredavanja) {
      if (k - this.podaci.brojPredavanjaSedmicno < brojPrisustva) {
        return true;
      } else {
        return false;
      }
    }
  }


  let createTable = function() {
    var table = document.createElement('table');
    table.style.border = "1px solid black";
    table.style.border.collapse = "collapse";
    table.style.height = "100%";
    table.style.width = "60%";
    table.style.margin.left = "auto";
    table.style.margin.right = "auto";
    table.style.wordwrap = "break-word";
    table.style.background = "#F5EDDC";

    //table.appendChild(createTableHeader(this.podaci.prisustva.length/this.podaci.studenti.length))
    var brojsedmica = this.podaci.prisustva.length / this.podaci.studenti.length;
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
    for (var i = 0; i < this.podaci.studenti.length; i++) {

      var tr = document.createElement('tr');
      for (var j = 0; j < brojsedmica + 3; j++) {
        switch (j) {
          case 0:
            var tdElement = document.createElement('td');
            tdElement.innerHTML = this.podaci.studenti[i].ime;
            tr.appendChild(tdElement);
            break;
          case 1:
            var tdElement = document.createElement('td');
            tdElement.innerHTML = this.podaci.studenti[i].index;
            tr.appendChild(tdElement);
            break;
          case brojsedmica + 2:
            var tdElement = document.createElement('td');
            tr.appendChild(tdElement);
            break;
          case this.podaci.prisustva.length / this.podaci.studenti.length + 1:
            var tdElement = document.createElement('td');

            for (var l = 0; l < 2; l++) {
              var inner_tr = document.createElement('tr');
              for (var k = 0; k < this.podaci.brojPredavanjaSedmicno + this.podaci.brojVjezbiSedmicno; k++) {
                var inner_td = document.createElement('td');
                inner_td.style.width = "23%";


                if (l == 0) {
                  if (k < this.podaci.brojPredavanjaSedmicno) {
                    inner_td.innerHTML = "P" + (k + 1);
                  } else {
                    inner_td.innerHTML = "V" + (k - podaci.brojPredavanjaSedmicno + 1);
                  }
                } else {
                  if (k < this.podaci.brojPredavanjaSedmicno) {
                    if (colorTheTilePredavanja(this.podaci.prisustva[i + 2].predavanja, k)) {
                      inner_td.style.background = "#9CFF2E";
                    } else {
                      inner_td.style.background = "#E0144C";

                    }
                  } else {
                    if (colorTheTileVjezbe(this.podaci.prisustva[i + 2].vjezbe, k)) {
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

            tdElement.innerHTML = calculatePercentage(this.podaci.prisustva[i + (j - 2) * 2]) + "%";
            tr.appendChild(tdElement);
            break;

        }
        table.appendChild(tr);

      }
    }
    this.divRef.appendChild(table);
    table.setAttribute("border", "2");
  }

  let createButton = function() {
    var button1 = document.createElement("button");
    var button2 = document.createElement("BUTTON");
    button1.innerHTML = "Click Me";
    button1.style.align = "center";
    document.body.appendChild(button1);
    button2.innerHTML = "Click Me";
    button2.style.align = "center";
    document.body.appendChild(button2);
    this.divRef.appendChild(button1);
    this.divRef.appendChild(button2);
  };

  let sljedecaSedmica = function() {

  };

  let prethodnaSedmica = function() {

  };

  createTitle();
  createTable();
  createButton();

  return {
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica,
  };
};
