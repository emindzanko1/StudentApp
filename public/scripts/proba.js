//document.body.innerHTML = '';



//var proba = Object.keys(podaci["studenti"]).length;
//alert(nesto);

//var divRef = document.getElementById("tabela");

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

  console.log(divRef);

  this.divRef = divRef;
  this.podaci = podaci;


  let createTitle = function() {

    var h1 = document.createElement("h1");
    h1.innerHTML = this.podaci.predmet;
    document.body.appendChild(h1);

  }

  let createSubtitle = function() {

    var h2 = document.createElement("h2");
    h2.innerHTML = "Računarstvo i informatika BSc 2";
    document.body.appendChild(h2);

  }

  let createTable = function() {
    // creates a <table> element and a <tbody> element
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");

    for (let i = 0; i < this.podaci.studenti.length + 4; i++) {
      this.k = 0;

      if (i > 2 && i % 2 == 0) {
        k++;
      }


      var row = document.createElement("tr");

      if (i < 2) {
        row.style.background = "#A2B5BB";
      } else {
        row.style.background = "#F5EDDC";
      }


      for (let j = 0; j < 18; j++) {

        var cell = document.createElement("th");


        if (i == 0) {


          if (j == 0) {
            var cellName = document.createTextNode("Ime i prezime");
            cell.appendChild(cellName);

          } else if (j == 1) {
            var cellIndex = document.createTextNode("Index");
            cell.appendChild(cellIndex);

          } else if (j > 1 && j <= 12) {
            var cellNumber = document.createTextNode(convertToRoman(j - 1));
            cell.appendChild(cellNumber);

          } else if (j > 12 && j < 17) {
            var cellNumber2 = document.createTextNode(convertToRoman(11));
            cell.appendChild(cellNumber2);

          } else {
            var cellNumber3 = document.createTextNode(convertToRoman(j - 5) + "-" + convertToRoman(j - 2));
            cell.appendChild(cellNumber3);
          }
        } else if (i !== 0 && i % 2 == 0) {

          switch(j){
            case 0:
            var studentName = document.createTextNode(this.podaci.studenti[k].ime);
            cell.innerHTML = this.podaci.studenti[k].ime;
            case 1:
            var studentIndex = document.createTextNode(this.podaci.studenti[k].index);
            cell.innerHTML = this.podaci.studenti[k].index;
            default:

          }

          //console.log(i);

          //cell.appendChild(proba);
        } else {
          //cell.rowSpan = 0;
        }

        row.appendChild(cell);

      }



      // add the row to the end of the table body
      tableBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    table.appendChild(tableBody);
    // appends <table> into <body>
    this.divRef.appendChild(table);
    // sets the border attribute of tbl to '2'
    table.setAttribute("border", "2");
  }

  let createButton = function() {
    var button1 = document.createElement("button");
    var button2 = document.createElement("BUTTON");
    //<button onclick="myFunction()">Click me</button>
    //  button1.innerHTML = fa-solid fa-arrow-left";
    button1.innerHTML = "Click Me";
    button1.style.align = "center";
    document.body.appendChild(button1);
    button2.innerHTML = "Click Me";
    button2.style.align = "center";
    document.body.appendChild(button2);

  };

  let sljedecaSedmica = function() {

  };

  let prethodnaSedmica = function() {

  };

  createTable();

  return {
    createTitle: createTitle,
    createSubtitle: createSubtitle,
    createTable: createTable,
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica,
    createButton: createButton
  };
};

// TabelaPrisustvo().createTitle();
// TabelaPrisustvo().createSubtitle();
// TabelaPrisustvo().createTable();
// TabelaPrisustvo().createButton();
