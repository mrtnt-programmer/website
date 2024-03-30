var VIDE = 0, MOI = 1, ORDI = 2 
var tab = []
var nombreDeCoups = 0
var score = []
score[MOI] = 0
score[ORDI] = 0

function action(l,c){
  document.getElementById('restart').innerHTML =''
  document.getElementById(l+','+c).innerHTML = 'X'
  nombreDeCoups++
  tab[l][c] = MOI
  if (victoire(MOI)){
    document.getElementById('message').innerHTML = 'tu as gagné'
    enleveBouton()
    score[MOI]++
    document.getElementById('ton score').innerHTML = score[MOI]
    restart()
  }
  else{ 
    coupOrdi()
    if (victoire(ORDI)){
      document.getElementById('message').innerHTML = "j'ai gagné"
      enleveBouton()
      score[ORDI]++
      document.getElementById('score ordi').innerHTML = score[ORDI]
      restart()
    }
  }
  matchNul()
}

function matchNul(){
  if (nombreDeCoups==9){
    document.getElementById('message').innerHTML = "match nul"
    restart()
  }
}

function restart(){
  document.getElementById('restart').innerHTML = "<input type='button' value='restart' onclick='videTableau()'>"
  nombreDeCoups = 0
}

function enleveBouton(){
  for(var l = 0; l<3; l++){
    for(var c = 0; c<3; c++){
      if (tab[l][c] == VIDE){
        document.getElementById(l+','+c).innerHTML = ''
      }
    }
  }
}
 
function videTableau(){
  for(var l = 0; l<3; l++){
    tab[l] = []
    for(var c = 0; c<3; c++){
      tab[l][c] = VIDE
      document.getElementById(l+','+c).innerHTML =  "<input type='button' onclick='action("+l+","+c+")'>"
    }
  }
  document.getElementById('message').innerHTML =''
  document.getElementById('restart').innerHTML ='' 
}

function fabriqueTable(){
  document.write('<table>')
  for(var l = 0; l<3; l++){
    document.write('<tr>')
    for(var c = 0; c<3; c++){  
      document.write('<td id="'+l+','+c+'"></td>')      
    }
    document.write('</tr>')
  }
  document.write('</table>')   
}

function coupOrdi(){
//il regarde si il peut gagner 
  for(var l = 0; l<3; l++){
    for(var c = 0; c<3; c++){      
      if (tab[l][c] == VIDE){
        tab[l][c] = ORDI
        if (victoire(ORDI)){
          document.getElementById(l+','+c).innerHTML = 'O'
          nombreDeCoups++
          return
        }
        tab[l][c] = VIDE  
      }
    }
  }
  
  //il essaye de bloquer
  
    for(var l = 0; l<3; l++){
      for(var c = 0; c<3; c++){      
        if (tab[l][c] == VIDE){
          tab[l][c] = MOI
          if (victoire(MOI)){
            document.getElementById(l+','+c).innerHTML = 'O'
            nombreDeCoups++
            tab[l][c] = ORDI
            return
          }
          tab[l][c] = VIDE
        }
      }
    }
  
  //il essaye de jouer au milieu
  if (tab[1][1] == VIDE){
    document.getElementById('1,1').innerHTML = 'O'
    nombreDeCoups++
    tab[1][1] = ORDI
    return    
  }
      
  //il joue la premiere case vide
  for(var l = 0; l<3; l++){
    for(var c = 0; c<3; c++){      
      if (tab[l][c] == VIDE){      
        document.getElementById(l+','+c).innerHTML = 'O'
        nombreDeCoups++
        tab[l][c] = ORDI
        return
      }
    }
  }
}
      
function troisColonne(joueur,col){
  return  tab[0][col] == joueur && tab[1][col] == joueur && tab[2][col] == joueur 
}  

function troisLigne(joueur,ligne){
  return  tab[ligne][0] == joueur && tab[ligne][1] == joueur && tab[ligne][2] == joueur 
}

function troisDiagonale(joueur){
  var test = false
  test =   tab[0][0] == joueur && tab[1][1] == joueur && tab[2][2] == joueur
  test = test || (tab[0][2] == joueur && tab[1][1] == joueur && tab[2][0] == joueur)
  return test
}

function victoire(joueur){
  var test = false  
  
  test = troisColonne(joueur,0) || troisColonne(joueur,1) || troisColonne(joueur,2) 
  test = test || troisLigne(joueur,0)|| troisLigne(joueur,1)|| troisLigne(joueur,2)
  test = test || troisDiagonale(joueur)
  return test
}