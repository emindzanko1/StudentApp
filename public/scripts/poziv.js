function login(error, data) {
  if (error == null) {
    let  obj = JSON.parse(data);
    window.location.assign(obj.url);
  }

}
function logout(error, data) {
  if (error == null) {
    let  obj = JSON.parse(data);
    window.location.assign(obj.url);
  }
}

function predmeti(error, data) {
  if(error == null){
        let lista_predmeta = JSON.parse(data);
        if (lista_predmeta.hasOwnProperty("greska")) {
          var greska = document.createElement("p");
          greska.innerHTML = lista_predmeta.greska;
          document.getElementById("meni").appendChild(greska);
        }
        else {
        var list = document.createElement("ul");
        for (let predmet of lista_predmeta){
          var item = document.createElement("li");
          item.innerHTML = predmet;
          list.appendChild(item);
        }
        document.getElementById("meni").appendChild(list);}
  }
}

function isloggedin(error, data) {
  if(error == null){
    var dugme = document.getElementById("logoutdugme");
      if (data=="false"){
        dugme.style.visibility = "hidden";
      }
  }
}

function predmetiInit () {
  getPredmeti();
  getLoggedIn();
}

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

function postLogOut(){
  PoziviAjax.postLogout(logout);
}
