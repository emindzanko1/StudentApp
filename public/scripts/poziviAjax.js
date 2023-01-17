// function submitLogin() {
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//
//
//   var ajax = new XMLHttpRequest();
//   ajax.onreadystatechange = function() {
//     if (ajax.readyState == 4 && ajax.status == 200) {
//       console.log("Success");
//       let obj = JSON.parse(ajax.responseText);
//
//       window.location.assign(obj.url);
//       //fnCallback()
//     }
//   }
//   ajax.open("POST", "/login", true);
//   ajax.setRequestHeader("Content-type", "application/json");
//   ajax.send(JSON.stringify({
//     username: username,
//     password: password
//   }));
//
//   // PoziviAjax();
// }

const PoziviAjax = (() => {
  //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
  // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
  // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
  function getError(status) {
    if(status == 200) {
      return null;
    }
    else return 1;
  }

  function impl_isLoggedin(fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4) {
        fnCallback(getError(ajax.status), ajax.responseText);
      } }
      ajax.open("GET", "/isloggedin", true);
      ajax.send();
  }

  function impl_getPredmet(naziv, fnCallback) {}
  // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan

  function impl_getPredmeti(fnCallback) {

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4) {
        fnCallback(getError(ajax.status), ajax.responseText);
      } }

    ajax.open("GET", "/predmeti", true);
    ajax.send();
  }

  function impl_postLogin(username, password, fnCallback) {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = // login(getError(ajax.status), ajax.responseText);
    function() {
      if (ajax.readyState == 4) {
        fnCallback(getError(ajax.status), ajax.responseText);
      } }
      ajax.open("POST", "/login", true);
      ajax.setRequestHeader("Content-type", "application/json");
      ajax.send(JSON.stringify({
        username: username,
        password: password
      }));

  }

  function impl_postLogout(fnCallback)  {

    var ajax = new XMLHttpRequest();
    var error = null;

    ajax.onreadystatechange = // login(getError(ajax.status), ajax.responseText);
    function() {
      if (ajax.readyState == 4) {
        fnCallback(getError(ajax.status), ajax.responseText);
      } }
      ajax.open("POST", "/logout", true);
      ajax.setRequestHeader("Content-type", "application/json");
      ajax.send();

  }

  //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
  function impl_postPrisustvo(naziv, index, prisustvo, fnCallback) {}
  return {
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getPredmet: impl_getPredmet,
    getPredmeti: impl_getPredmeti,
    postPrisustvo: impl_postPrisustvo,
    getLoggedIn: impl_isLoggedin
  };
})();
