function proba() {
  console.log("proba");
}

//probati kasnije
//function (error, data) {}

function submitLogin() {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;


  PoziviAjax.postLogin(username, password, proba);

}
