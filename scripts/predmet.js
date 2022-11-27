var size = document.querySelectorAll(".redovni").length;

for (var i = 0; i < size; i++) {
  document.querySelectorAll(".redovni")[i].addEventListener("click", function() {

    var buttonInnerHtml = this.innerHTML;

    makeSound(buttonInnerHtml);

    buttonAnimation(buttonInnerHtml)

  });

  document.addEventListener("keydown", function(event) {

    makeSound(event.key);

    buttonAnimation(event.key);
  });

}

function makeSound() {
   var song1 = new Audio("../sounds/tom-1.mp3");
   song1.play();
}
