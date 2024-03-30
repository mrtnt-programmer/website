var VIDE = 0, MOI = 1, ORDI = 2//pour la meuilleur comprension du code, ce sont les identifiants
var tab = []//le plateau de jeu
var nombreDeCoups = 0
var score = []//score du joueur et de l'ordi
score[MOI] = 0
score[ORDI] = 0
var valeur = 0 //variable global pour la valeur d'un coup pour quand l'ordi joue

function action(c){//pose une piece dans une colonne
  document.getElementById('restart').innerHTML =''
  var l = trouveLigne(c)
  document.getElementById(l+','+c).innerHTML = 'X'
  nombreDeCoups++
  tab[l][c] = MOI
  verifieColonnePleine(c)
  if (victoire(MOI)){
    document.getElementById('message').innerHTML = 'Tu as gagné !'
    enleveBouton()
    score[MOI]++
    document.getElementById('ton score').innerHTML = score[MOI]
    restart()
  }
  else{ 
    coupOrdi()
    if (victoire(ORDI)){
      document.getElementById('message').innerHTML = "J'ai gagné !"
      enleveBouton()
      score[ORDI]++
      document.getElementById('score ordi').innerHTML = score[ORDI]
      restart()
    }
  }
  matchNul()
}

function verifieColonnePleine(c){
  if(tab[0][c] != VIDE){
    document.getElementById('button'+c).innerHTML = ''
  }   
}

function matchNul(){//regard si on a plus de coup a jouer
  if (nombreDeCoups==42){
    document.getElementById('message').innerHTML = "Match nul !"
    restart()
  }
}

function enleveBouton(){//supprime un bouton d'une colonne
  for(var c = 0; c<7; c++){
    document.getElementById('button'+c).innerHTML = ''
  }
}


function restart(){
  document.getElementById('restart').innerHTML = "<input type='button' value='restart' onclick='videTableau()'>"
  nombreDeCoups = 0
}

function trouveLigne(c){
  var ligne = 5
  while(tab[ligne][c] != VIDE){
    ligne--
  }
  return ligne
}

function videTableau(){//recommance la partie 
  for(var c = 0; c<7; c++){
//     document.getElementById('button'+c).innerHTML = "<form action='action("+c+")'><input type='image' src='fleche.gif' alt='Submit' width='33' height='68'></form>"
    document.getElementById('button'+c).innerHTML = "<input type='image' src='fleche.gif' alt='Submit' width='33' height='68' onclick='action("+c+")'>"
  }
  for(var l = 0; l<6; l++){
    tab[l] = []
    for(var c = 0; c<7; c++){
      tab[l][c] = VIDE
      document.getElementById(l+','+c).innerHTML = ''
    }
  }
  document.getElementById('message').innerHTML =''
  document.getElementById('restart').innerHTML ='' 
}

function fabriqueTable(){
  document.write('<table>')
  document.write('<tr>')
  for(var c = 0; c<7; c++){
    document.write("<th id='button"+c+"'></th>")
  }
  
  document.write('</tr>')
  for(var l = 0; l<6; l++){
    document.write('<tr>')
    for(var c = 0; c<7; c++){  
      document.write('<td id="'+l+','+c+'"></td>')      
    }
    document.write('</tr>')
  }
  document.write('</table>')   
}

//petit projet, l'ordi joue en donnant un score a chaque coup, notamment en regardant si l'adversaire va aligner
//un grand nombre de pieces ou sinon , si il va lui meme aligne un grand nombre de piece


function coupOrdi(){
  var meilleureValeur = -10000
  var meilleureColonne
  for(var c = 0; c<7; c++){      
    if (tab[0][c] == VIDE){
      var l = trouveLigne(c)
      tab[l][c] = ORDI
      if (calculeValeur()>meilleureValeur){
        meilleureValeur = calculeValeur()
        meilleureColonne = c
      }
      tab[l][c] = VIDE
    }
  }
  document.getElementById(trouveLigne(meilleureColonne)+','+meilleureColonne).innerHTML = 'O'
  nombreDeCoups++
  tab[trouveLigne(meilleureColonne)][meilleureColonne] = ORDI
  verifieColonnePleine(meilleureColonne)
}

function ajusteValeur(nombre){
  if (nombre[MOI] == 4){
    valeur = valeur - 500
  }
  if (nombre[MOI] == 3 && nombre[VIDE] == 1){
    valeur = valeur - 60
  }
  if (nombre[MOI] == 2 && nombre[VIDE] == 2){
    valeur = valeur - 20
  }
  if (nombre[MOI] == 1 && nombre[VIDE] == 3){
    valeur = valeur - 1
  }
  if (nombre[ORDI] == 4){
    valeur = valeur + 500
  }
  if (nombre[ORDI] == 3 && nombre[VIDE] == 1){
    valeur = valeur + 20
  }
  if (nombre[ORDI] == 2 && nombre[VIDE] == 2){
    valeur = valeur + 10
  }
  if (nombre[ORDI] == 1 && nombre[VIDE] == 3){
    valeur = valeur + 1
  }  
}

function calculeValeur(){
  var nombre = []
  valeur = 0
// lignes  
  for(var ligne = 0; ligne<6; ligne++){
    for (var c = 0; c<4; c++){
      nombre[ORDI] = 0
      nombre[MOI] = 0
      nombre[VIDE] = 0
      nombre[tab[ligne][c]]++
      nombre[tab[ligne][c+1]]++
      nombre[tab[ligne][c+2]]++
      nombre[tab[ligne][c+3]]++    
      ajusteValeur(nombre)
    }
  }
  
// colonnes
  for(var c = 0; c<7; c++){
    for (var ligne = 0; ligne<3;ligne++){
      nombre[ORDI] = 0
      nombre[MOI] = 0
      nombre[VIDE] = 0
      nombre[tab[ligne][c]]++
      nombre[tab[ligne+1][c]]++
      nombre[tab[ligne+2][c]]++
      nombre[tab[ligne+3][c]]++
      ajusteValeur(nombre)
    }
  }
// quatreDiagonaleMonte
  for(var ligne = 5; ligne>2; ligne--){
    for (var c = 0; c<4; c++){
      nombre[ORDI] = 0
      nombre[MOI] = 0
      nombre[VIDE] = 0
      nombre[tab[ligne][c]]++
      nombre[tab[ligne-1][c+1]]++
      nombre[tab[ligne-2][c+2]]++
      nombre[tab[ligne-3][c+3]]++
      ajusteValeur(nombre)
    }
  }
  // quatreDiagonaleBaisse
  for(var ligne = 0; ligne<3; ligne++){
    for (var c = 0; c<4; c++){
      nombre[ORDI] = 0
      nombre[MOI] = 0
      nombre[VIDE] = 0
      nombre[tab[ligne][c]]++
      nombre[tab[ligne+1][c+1]]++
      nombre[tab[ligne+2][c+2]]++
      nombre[tab[ligne+3][c+3]]++
      ajusteValeur(nombre)
    }
  }
  

  return valeur
}

// verification si quelqun a gagne

function victoire(joueur){  
  return quatreLigne(joueur) || quatreColonne(joueur) || quatreDiagonaleMonte(joueur) || quatreDiagonaleBaisse(joueur)
}
 
function quatreDiagonaleMonte(joueur){
  for(var ligne = 5; ligne>2; ligne--){
    for (var c = 0; c<4; c++){
      if (tab[ligne][c]==joueur && tab[ligne-1][c+1]==joueur&& tab[ligne-2][c+2]==joueur&& tab[ligne-3][c+3]==joueur)
        return true
    }
  }
  return false
}

function quatreDiagonaleBaisse(joueur){
  for(var ligne = 0; ligne<3; ligne++){
    for (var c = 0; c<4; c++){
      if (tab[ligne][c]==joueur && tab[ligne+1][c+1]==joueur&& tab[ligne+2][c+2]==joueur&& tab[ligne+3][c+3]==joueur)
        return true
    }
  }
  return false
}

function quatreLigne(joueur){
  for(var ligne = 0; ligne<6; ligne++){
    for (var c = 0; c<4; c++){
      if (tab[ligne][c]==joueur && tab[ligne][c+1]==joueur&& tab[ligne][c+2]==joueur&& tab[ligne][c+3]==joueur)
        return true
    }
  }
  return false
}


function quatreColonne(joueur){
  for(var c = 0; c<7; c++){
    for (var ligne = 0; ligne<3;ligne++){
      if (tab[ligne][c]==joueur && tab[ligne+1][c]==joueur&& tab[ligne+2][c]==joueur&& tab[ligne+3][c]==joueur)
        return true
    }
  }
  return false
}
