//list de deux dimention: "vide" si elle sont vide
var couleur = []//pour les couleur
var piece = []//pour les pieces
var colonneChoisie , ligneChoisie//les coordonnes de la piece a bouger


function fabriqueTable(){//on cree le plateau de jeu
  var couleurDeCase = 'caseBlanche'//la premiere case est blanche
  document.write('<table>')
  document.write('<tr>')  
  document.write('</tr>')
  for(var l = 0; l<8; l++){
    document.write('<tr>')
    for(var c = 0; c<8; c++){
      //chaque case aura sont id en fonction de sa ligne/colonne pour pourvoir gerer les pieces
      document.write('<td class = "'+couleurDeCase+'" id="'+l+','+c+'"></td>')      
      couleurDeCase = (couleurDeCase == 'caseBlanche') ? 'caseNoire' : 'caseBlanche'
    }
    document.write('</tr>')
    couleurDeCase = (couleurDeCase == 'caseBlanche') ? 'caseNoire' : 'caseBlanche'
  }
  document.write('</table>')   
}

function resetTable(){//on recommance la partie(remette a 0)
  for(var l = 0; l<8; l++){
    couleur[l] = []
    piece[l] = []
    for(var c = 0; c<8; c++){
      //remette a vide
      couleur[l][c] = 'vide'
      piece[l][c] = 'vide'
      // on place les pieces
      if(l==0 || l==1 ){
        couleur[l][c] = 'noir'
      }
      if(l==7 || l==6 ){
        couleur[l][c] = 'blanc'
      }
      if(l==6 || l==1){
        piece[l][c] = 'pion'
      }
      if(l==7 || l==0){
        switch(c){
          case 0:
          case 7:
            piece[l][c] = 'tour'
            break
          case 1:
          case 6:
            piece[l][c] = 'cavalier'
            break
          case 2:
          case 5:
            piece[l][c] = 'fou'
            break
          case 4:
            piece[l][c] = 'roi'
            break
          case 3:
            piece[l][c] = 'dame'
            break            
        }
      }
    }
  }  
  //remette a 0 les autre assets
  document.getElementById('message').innerHTML =''
  affichePiece1()
}

function affichePiece1(){//on affiche avec des bouton pour choisir la piece que l'on va bouger 
  var initiale = 'P', couleurDePiece = 'b'//on mette un pion blanc au cas ou ca plante
  for(var l = 0; l<8; l++){//regarde dans le tableau si il a une piece et on l'affiche dans ce cas
    for(var c = 0; c<8; c++){
      switch(piece[l][c]){
        case 'pion':
          initiale = 'P'
          break
        case 'tour':
          initiale = 'T'
          break
        case 'cavalier':
          initiale = 'C'
          break
        case 'fou':
          initiale = 'F'
          break
        case 'roi':
          initiale = 'R'
          break
        case 'dame':
          initiale = 'D'
          break
      }
      //affichages en injectant des images sur les cases
      couleurDePiece = (couleur[l][c] == 'blanc') ? 'b' : 'n'
      if(piece[l][c] != 'vide' && couleur[l][c] == 'blanc' ){
        document.getElementById(l+','+c).innerHTML = "<input type='image' src='images/"+initiale+couleurDePiece+".png' alt='' width='90%' height='90%' onclick='choisitPiece("+l+","+c+")'>"
      }
      if(piece[l][c] != 'vide' && couleur[l][c] == 'noir' ){
        document.getElementById(l+','+c).innerHTML = "<img src='images/"+initiale+couleurDePiece+".png' alt='' width='90%' height='90%'>"
      }
      if(piece[l][c] == 'vide'){
        document.getElementById(l+','+c).innerHTML = ''
      }
    }
  }
}

function affichePiece2(){//affichage avec des boutons pour bouger les pieces
  var initiale = 'P', couleurDePiece = 'b'
  for(var l = 0; l<8; l++){
    for(var c = 0; c<8; c++){
      switch(piece[l][c]){
        case 'pion':
          initiale = 'P'
          break
        case 'tour':
          initiale = 'T'
          break
        case 'cavalier':
          initiale = 'C'
          break
        case 'fou':
          initiale = 'F'
          break
        case 'roi':
          initiale = 'R'
          break
        case 'dame':
          initiale = 'D'
          break
      }
      couleurDePiece = (couleur[l][c] == 'blanc') ? 'b' : 'n'
      if(piece[l][c] != 'vide'){
        if(l == ligneChoisie && c == colonneChoisie){//la case selectionner change de couleur
          document.getElementById(l+','+c).className = "caseJaune"
        }
        document.getElementById(l+','+c).innerHTML = "<input type='image' src='images/"+initiale+couleurDePiece+".png' alt='' width='90%' height='90%' onclick='choisitArrivee("+l+","+c+")'>"
      }
      else{
        document.getElementById(l+','+c).innerHTML = "<input class='caseVide' type='button' onclick='choisitArrivee("+l+","+c+")'>"
      }
    }
  }
}

function choisitPiece(ligne, colonne){//quand on appuie sur une pieces(a nous) on affiche les bouton pour bouger
  ligneChoisie = ligne
  colonneChoisie = colonne
  affichePiece2()
}

function choisitArrivee(l,c){//il faut verifier si le coup respect les regles
  //il faut remettre la case selectionne a sa couleur original
  for(var li = 0; li<8; li++){
    for(var co = 0; co<8; co++){
      if(li == ligneChoisie && co == colonneChoisie){//la case selectionner change de couleur
        if((ligneChoisie+colonneChoisie)%2 == 1){//on regard si la case est blanche ou noire
          document.getElementById(li+','+co).className = "caseNoire"   
        }else{
          document.getElementById(li+','+co).className = "caseBlanche"   
        }  
      }
    }
  }

  if(coupAutoriseGlobal(ligneChoisie, colonneChoisie,l,c,'blanc')){
    piece[l][c] = piece[ligneChoisie][colonneChoisie]
    couleur[l][c] = couleur[ligneChoisie][colonneChoisie]
    if(piece[l][c] == 'pion' && l == 0){
      piece[l][c] = promotion()
      alert(piece[l][c])
    }
    piece[ligneChoisie][colonneChoisie] = 'vide'
    couleur[ligneChoisie][colonneChoisie] = 'vide'
    if (victoire('blanc')){
      document.getElementById('message').innerHTML = 'Tu as gagné !'
      enleveBouton()
      restart()
    }
    else if(pat('noir')){
      document.getElementById('message').innerHTML = 'Pat !'
      enleveBouton()
      restart()
    }
    else{ 
      coupOrdi()
      if (victoire('noir')){
        document.getElementById('message').innerHTML = "J'ai gagné !"
        enleveBouton()
        restart()
      if (pat('blanc')){
          document.getElementById('message').innerHTML = 'Pat !'
          enleveBouton()
          restart()
        }
      }
    }
  }
  affichePiece1()
}

function promotion(){//promotion du pion
  enleveBouton()
  document.getElementById('message').innerHTML = "<input type='image' src='images/Db.png' alt='' width='90%' height='90%' onclick='return \'dame\''>"  
}

function peutJouer(joueur){//regard si il a un coup possible du joueur
  for(var ligneDepart = 0; ligneDepart<8; ligneDepart++){
    for(var colonneDepart = 0; colonneDepart<8; colonneDepart++){
      if(couleur[ligneDepart][colonneDepart] == joueur){
        for(var ligneArrivee = 0; ligneArrivee<8; ligneArrivee++){
          for(var colonneArrivee = 0; colonneArrivee<8; colonneArrivee++){
            if(coupAutoriseGlobal(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee,joueur)){
              return true
            }
          }
        }
      }
    }
  }
  return false
}

function victoire(joueur){//test si quelqun a gagne
  var adversaire = (joueur == 'blanc') ? 'noir' :'blanc'
  return roiEnEchec(adversaire) && !peutJouer(adversaire)
}

function pat(joueur){
  return !peutJouer(joueur) && !roiEnEchec(joueur)
}

function enleveBouton(){//affichages sans les bouton
  var initiale = 'P', couleurDePiece = 'b'
  for(var l = 0; l<8; l++){
    for(var c = 0; c<8; c++){
      switch(piece[l][c]){
        case 'pion':
          initiale = 'P'
          break
        case 'tour':
          initiale = 'T'
          break
        case 'cavalier':
          initiale = 'C'
          break
        case 'fou':
          initiale = 'F'
          break
        case 'roi':
          initiale = 'R'
          break
        case 'dame':
          initiale = 'D'
          break
      }
      couleurDePiece = (couleur[l][c] == 'blanc') ? 'b' : 'n'
      if(piece[l][c] != 'vide'){
        document.getElementById(l+','+c).innerHTML = "<img src='images/"+initiale+couleurDePiece+".png' alt='' width='90%' height='90%'>"
      }
      else{
        document.getElementById(l+','+c).innerHTML = ''
      }
    }
  }
}

function coupOrdi(){//petit projet de cree une intelligence pour jouer
  //l'idee va etre de donner une valeur a chaque coup possible, valeur c'est a dire prendre une piece,
  //etre pris(pas encore implementer, le probleme etant de regarder plusiere coup dans le futur qui est tres
  //lourd), ou alors controller le centre. de cette facon on peux jouer des coups semi intelligent

  
  var meilleureValeur = 10000
  var meilleureLigneDepart, meilleureLigneArrivee, meilleureColonneDepart, meilleureColonneArrivee
  for(var ligneDepart = 0; ligneDepart<8; ligneDepart++){
    for(var colonneDepart = 0; colonneDepart<8; colonneDepart++){
      if (couleur[ligneDepart][colonneDepart] == 'noir'){
        for(var ligneArrivee = 0; ligneArrivee<8; ligneArrivee++){
          for(var colonneArrivee = 0; colonneArrivee<8; colonneArrivee++){
            if(coupAutoriseGlobal(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee,'noir')){
              var souvenirPiece = piece[ligneArrivee][colonneArrivee]
              var souvenirCouleur = couleur[ligneArrivee][colonneArrivee] 
              piece[ligneArrivee][colonneArrivee] = piece[ligneDepart][colonneDepart]
              couleur[ligneArrivee][colonneArrivee] = couleur[ligneDepart][colonneDepart]
              piece[ligneDepart][colonneDepart] = 'vide'
              couleur[ligneDepart][colonneDepart] = 'vide'
              if (calculeValeur()<meilleureValeur){
                meilleureValeur = calculeValeur()
                meilleureLigneDepart = ligneDepart
                meilleureLigneArrivee = ligneArrivee
                meilleureColonneDepart = colonneDepart
                meilleureColonneArrivee = colonneArrivee
              }
              piece[ligneDepart][colonneDepart] = piece[ligneArrivee][colonneArrivee]
              couleur[ligneDepart][colonneDepart] = couleur[ligneArrivee][colonneArrivee]
              piece[ligneArrivee][colonneArrivee] = souvenirPiece
              couleur[ligneArrivee][colonneArrivee] = souvenirCouleur
            }
          }
        }
      }
    }
  }
  piece[meilleureLigneArrivee][meilleureColonneArrivee] = piece[meilleureLigneDepart][meilleureColonneDepart]
  couleur[meilleureLigneArrivee][meilleureColonneArrivee] = couleur[meilleureLigneDepart][meilleureColonneDepart]
  piece[meilleureLigneDepart][meilleureColonneDepart] = 'vide'
  couleur[meilleureLigneDepart][meilleureColonneDepart] = 'vide'

  //document.getElementById('message').innerHTML = meilleureValeur  //la valeur du meilleur coup 
}

function calculeValeur(){
  var nombreDePoints = 0, signe
  for(var ligne = 0; ligne<8; ligne++){
    for(var colonne = 0; colonne<8; colonne++){
      if(piece[ligne][colonne] != 'vide'){
        signe = (couleur[ligne][colonne] == 'blanc') ? 1 : -1
//         Valeur des pieces
        switch(piece[ligne][colonne]){
          case 'pion':
            nombreDePoints = nombreDePoints + signe
            break
          case 'cavalier' :
          case 'fou' :  
            nombreDePoints = nombreDePoints + signe * 3
            break
          case 'tour':
            nombreDePoints = nombreDePoints + signe * 5
            break
          case 'dame':
            nombreDePoints = nombreDePoints + signe * 10
            break  
        }
//         controle du centre
        for(var ligneDuCentre = 3; ligneDuCentre<5; ligneDuCentre++){
          for(var colonneDuCentre = 3; colonneDuCentre<5; colonneDuCentre++){
            if (piece[ligneDuCentre][colonneDuCentre] == 'vide' && coupAutoriseGlobal(ligne, colonne, ligneDuCentre, colonneDuCentre, couleur[ligne][colonne])){              nombreDePoints = nombreDePoints + signe * 2  
            }
          }
        }
      }
    }
  }
  return nombreDePoints
}

function roiEnEchec(joueur){//regard si le joueur est en echec
  var ligneDuRoi, colonneDuRoi
  //on trouve le roi
  for(var ligne = 0; ligne<8; ligne++){
    for(var colonne = 0; colonne<8; colonne++){
      if(piece[ligne][colonne] == 'roi' && couleur[ligne][colonne] == joueur){
        ligneDuRoi = ligne
        colonneDuRoi = colonne
      }
    }
  }
  //on regarde si on peux le capturer
  var adversaire = (joueur == 'blanc') ? 'noir' :'blanc'
  for(var ligne = 0; ligne<8; ligne++){
    for(var colonne = 0; colonne<8; colonne++){
      if(couleur[ligne][colonne] == adversaire && coupAutorisePiece(ligne, colonne, ligneDuRoi, colonneDuRoi, adversaire)){
        return true
      }
    }
  }
  return false
}

function coupAutorisePiece(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee,joueur){
  var testeCaseArrivee = false, testeRegle = false, differenceColonne, differenceLigne
  testeCaseArrivee = couleur[ligneArrivee][colonneArrivee] != joueur
  
  differenceLigne = Math.abs(ligneArrivee - ligneDepart)
  differenceColonne = Math.abs(colonneArrivee - colonneDepart)
  //les regles de deplacement celon la piece
  switch(piece[ligneDepart][colonneDepart]){
    case 'cavalier':
      testeRegle = (differenceColonne == 1 && differenceLigne == 2) || (differenceColonne == 2 && differenceLigne == 1)
      break
    case 'roi':
      testeRegle = (differenceColonne <= 1 && differenceLigne <= 1)
      break
    case 'tour':
      testeRegle = (differenceColonne == 0 || differenceLigne == 0) && pasDobstacle(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee)
      break
    case 'fou':
      testeRegle = (differenceColonne == differenceLigne) && pasDobstacle(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee)
      break
    case 'dame':
      testeRegle = (differenceColonne == differenceLigne || differenceColonne == 0 || differenceLigne == 0) && pasDobstacle(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee)
      break
    case 'pion':
      var sensPion = (joueur == 'blanc') ? -1 : 1
      var ligneDePion = ( joueur == 'blanc') ? 6 : 1
      if(piece[ligneArrivee][colonneArrivee] == 'vide'){
        testeRegle = ((ligneArrivee - ligneDepart) == sensPion && differenceColonne == 0)
          || (ligneDepart == ligneDePion && differenceColonne == 0 && differenceLigne == 2 && pasDobstacle(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee))
      }
      else{
        testeRegle = ((ligneArrivee - ligneDepart) == sensPion && differenceColonne == 1)
      }
      break
    default:
      testeRegle = true
  }
  return testeCaseArrivee && testeRegle
}

function coupAutoriseGlobal(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee,joueur){
  if(coupAutorisePiece(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee,joueur)){
    //on joue le coup temporaiarement pour voir si on serai en echec, et donc si c'est illegal
    var souvenirPiece = piece[ligneArrivee][colonneArrivee]
    var souvenirCouleur = couleur[ligneArrivee][colonneArrivee] 
    piece[ligneArrivee][colonneArrivee] = piece[ligneDepart][colonneDepart]
    couleur[ligneArrivee][colonneArrivee] = couleur[ligneDepart][colonneDepart]
    piece[ligneDepart][colonneDepart] = 'vide'
    couleur[ligneDepart][colonneDepart] = 'vide'
    var testeEchec = roiEnEchec(joueur)//test
    //on remette comme avant
    piece[ligneDepart][colonneDepart] = piece[ligneArrivee][colonneArrivee]
    couleur[ligneDepart][colonneDepart] = couleur[ligneArrivee][colonneArrivee]
    piece[ligneArrivee][colonneArrivee] = souvenirPiece
    couleur[ligneArrivee][colonneArrivee] = souvenirCouleur
    return ! testeEchec
  }
  else{
    return false
  }
}
  
function pasDobstacle(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee){
  var ligneCourante = ligneDepart, colonneCourante = colonneDepart
  var pasDeLigne = 0, pasDeColonne = 0
  if(ligneDepart > ligneArrivee){
    pasDeLigne = -1
  }
  if(ligneDepart < ligneArrivee){
    pasDeLigne = 1
  }
  if(colonneDepart > colonneArrivee){
    pasDeColonne = -1
  }
  if(colonneDepart < colonneArrivee){
    pasDeColonne = 1
  }
  ligneCourante = ligneCourante + pasDeLigne
  colonneCourante = colonneCourante + pasDeColonne
  while(ligneCourante != ligneArrivee || colonneCourante != colonneArrivee){
    if(piece[ligneCourante][colonneCourante] != 'vide'){
      return false
    }
    ligneCourante = ligneCourante + pasDeLigne
    colonneCourante = colonneCourante + pasDeColonne
  }
  return true
}