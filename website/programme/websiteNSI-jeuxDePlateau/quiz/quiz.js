var type;//C'est une variable globale
var quiz ={
}

function entreetype(typedonner) {
    type = typedonner
    document.getElementById("salut").innerHTML = "Bienvenue sur le QUIZZ " + type;
    //On cache le premier formulaire
    document.getElementById("demande_type").style.display = "none";
    //On montre les questions
    document.getElementById("questions").style.display = "block";
    //on inject les question dans le html selon le type de quiz
    document.getElementById("questions").style.display = "block";
}

function calculePoints() {
  //Bonnes réponses :
  var bonneReponse1 = "q1r2";
  var bonneReponse2 = "q2r2";
  var texte1, texte2, texte3;
  points = 0;
  if (document.getElementById(bonneReponse1).checked == true) {
    texte1 = "<p class='bien'>Bonne réponse à la question 1</p>";
    points = points + 5;
  } else {
    texte1 = "<p class='bad'>Mauvaise réponse à la question 1</p>";
    points = points - 1;
  }
  if (document.getElementById(bonneReponse2).checked == true) {
    texte2 = "<p class='bien'>Bonne réponse à la question 2</p>";
    points = points + 5;
  } else {
    texte2 = "<p class='bad'>Mauvaise réponse à la question 2</p>";
    points = points - 1;
  }
  
  textePoints = "<h2>Total: " + points + " points</h1>";
  document.getElementById("correction").innerHTML = texte1 + texte2 + texte3 + textePoints;
}


