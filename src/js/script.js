window.onload = function () {
  const gameContainer = document.querySelector("#game-container");
  const clickZone = document.querySelector("#click-zone");
  const monViseur = document.querySelector("#mViseur");
  const startTitle = document.querySelector("#start-title");
  const startBtn = document.querySelector("#start-btn");
  const scoreDisplay = document.querySelector("#score-display");
  const myAudio = document.querySelector("#myAudio");

  //const myAudio = document.getElementById("myAudio");

  // myAudio.play();

  //TO SHOW!!
  let fishIntervals = [];
  let moveInterval;
  let createFishInterval;
  let score = 0;
  let currentScore = 0;
  let timer = 20;
  function updateTimerDisplay() {
    document.getElementById("timer").innerText = timer;
  }

  document.querySelector("#reset-btn").addEventListener("click", function () {
    document.querySelector("#endgame-popup").style.display = "none";
    score = 0;
    currentScore = 0;
    timer = 20;
    document.querySelector("#score-display").innerText = "Score: " + score;
    updateTimerDisplay();

    // Redémarre le compte à rebours
    countdownInterval = setInterval(countdown, 1000);
    // Assure-toi que la fonction startGame n'initialise pas d'autres logiques que tu ne veux pas répéter inutilement.
    startGame();
  });

  function countdown() {
    if (timer > 0) {
      timer--; // Décrémente le minuteur
      updateTimerDisplay(); // Met à jour l'affichage
    } else {
      clearInterval(countdownInterval); // Arrête le minuteur
      clearInterval(moveInterval);
      endGame();
      //alert("Le temps est écoulé !");
      // Vous pouvez ajouter d'autres actions ici, comme terminer le jeu ou cacher des éléments
    }
  }

  let countdownInterval = setInterval(countdown, 1000); // Appelle countdown toutes les secondes

  clickZone.focus();
  //monViseur.focus();
  let mousePosition = {
    x: 0,
    y: 0,
  };

  /*let position = {
            x: 900,
            y: 470
        }*/
  //change var en let.

  //music and sounds

  //event listeners
  //startBtn.addEventListener("click", startGame);

  //  startBtn.addEventListener("click", startGame);

  clickZone.addEventListener("mousemove", monCurseur);
  //document.addEventListener("keydown", monCurseur);
  //document.addEventListener("keydown", handleKeydown);
  startGame();
  //TO SHOW!!

  // clickZone.addEventListener("keydown", handleKeydown);

  function monCurseur(event) {
    //update cursor coordinates
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
    //set viseur to follow mouvement
    monViseur.style.left = mousePosition.x + "px";
    monViseur.style.top = mousePosition.y + "px";
    //console.log(mousePosition.x, mousePosition.y);
  }

  /* j'appelle un eventlistener dans ma zone de click que j'ai appelé clickzone, le fait de bouger
                                                                                                                                                                                                                                        la souris (mousemove) permet d'appeler la fonction monCurseur, à chaque fois que l'evenement mouse move
                                                                                                                                                                                                                                        est détécté j'envoie les positions ou les coordonnées horizontals et verticals de la position de la souris
                                                                                                                                                                                                                                        les x, et y de la souris sont ensuite affecté à mon element monViseur et met à jour les propriété left & right 
                                                                                                                                                                                                                                        en ajoutant au chiffre récupéré les pixels*/

  /*
    function handleKeydown(event) {
        const step = 10; // Define how many pixels the fishing line moves per key press

        if (event.key === "ArrowUp") {
            position.y -= step;
        } else if (event.key === "ArrowDown") {
            position.y += step;
        } else if (event.key === "ArrowLeft") {
            position.x -= step;
        } else if (event.key === "ArrowRight") {
            position.x += step;
        }
        
        // Update the fishing line's position
        monViseur.style.left = position.x + "px";
        monViseur.style.top = position.y + "px";
    }

    */

  function startGame() {
    countdown();
    currentScore = 0;
    startTitle.style.display = "none";
    clickZone.style.display = "block";
    createItems();
    clickZone.focus();
    score = 0;
    currentScore = 0;

    /*
        // Démarrage d'un timer de 20 secondes au début du jeu
        setTimeout(function() {
            // Ici, vous pouvez changer cette partie pour afficher le score de la manière que vous préférez.
        

            if (score > 2) {
                //alert("!!!!CONGRATULATIONS!!!!! Votre score est : " + score);
                endGame();
            } else {
                //alert("Time is up!! Try again! Votre score est de seulement: " + score);
                endGame();
            }

            location.reload();  
        }, 15000); // 20000 millisecondes = 20 secondes

        */
  }

  function createItems() {
    createFishInterval = setInterval(createFish, 1000);
  }

  function createFish() {
    let fish = document.createElement("div");
    //  fish.classList.add("item");
    fish.classList.add("fish");
    clickZone.appendChild(fish);
    setPos(fish);
    fish.addEventListener("click", catchFish);

    setTimeout(function () {
      //remove

      if (!fish.classList.contains("caught")) {
        fish.classList.add("disappear");
      }
      setTimeout(function () {
        if (clickZone.contains(fish)) {
          clickZone.removeChild(fish);
        }
      }, 500); //frequency fish disappear
    }, 300); //frequency fish created
  } //use variables instead of 500/300 when you reach un threshold u change h

  /*la fonction fish permet de créer un div contenant l'element fish chaque demi-second. et je lui affecte une position
                                                                                                                                                                        aléatoire grace à la fonction setPos qu'on verra plus en détails par la suite.
                                                                                                                                                                        si l'utilisateur arrive à capturer le poisson la classe caught est ajouté à puis je fais disparaitre le poisson
                                                                                                                                                                        si non le poisson reste un petit moment avec de disparaitre sans ajouter la classe caught"*/

  function setPos(item) {
    let leftPos = Math.floor(Math.random() * (clickZone.offsetWidth - 100));
    let topPos = Math.floor(
      Math.random() * ((clickZone.offsetHeight / 5) * 3 - 200) +
        clickZone.offsetHeight / 5
    );
    let randomNum = Math.floor(Math.random() * 2);
    //left side
    /*if (randomNum%2 === 0)
            {
                    leftPos = Math.floor(Math.random() * ((clickZone.offsetWidth/2)-100));
                    setInterval(function(){
                    if (item.classList.contains("fish")) {
                    leftPos+=5;
                    }
                    item.style.left = leftPos+"px";
                    item.style.top = topPos+200+"px"; //or item.style.top=topPos+px for démo
                }, 100);
            }*/

    /* cette fonction permet de positionner le poisson dans ma zone de clique d'une facon aléatoire
                                                                                                                                                                                                                                    un chiffre entre 0 et 1 est choisi puis multiplié par 2, si le chiffre et paire je mets le poisson 
                                                                                                                                                                                                                                    dans le coté gauche de mon ecran si non je le mets à droite.
                                                                                                                                                                                                                                    prenant l'ex. de celui d'à gauche. je recalcule ma leftposition en prenant que les dimension du coté gauche
                                                                                                                                                                                                                                    (d'où le /2) et je rajoute la position du poisson par 5 px :
                                                                                                                                                                                                                                    +5px pour le gauche vers la droite 
                                                                                                                                                                                                                                    et -5px pour la droite vers la gauche. */

    //right side
    //else {
    leftPos = Math.floor(
      Math.random() * (clickZone.offsetWidth / 2 - 100) +
        clickZone.offsetWidth / 2
    );
    moveInterval = setInterval(function () {
      leftPos -= 5;
      item.style.left = leftPos + "px";
      item.style.top = topPos + 200 + "px";
    }, 100);
    fishIntervals.push(moveInterval);
    item.classList.add("right");
    //  }
    item.style.left = leftPos + "px";
    item.style.top = topPos + 200 + "px";
  }

  function catchFish(event) {
    let type = event.target.classList;
    console.log(type);
    let catchText = document.createElement("span");
    catchText.setAttribute("class", "hit-text");
    this.parentNode.insertBefore(catchText, this);
    catchText.style.left = this.style.left;
    catchText.style.top = this.style.top;

    let topValue = parseInt(this.style.top, 10);
    catchText.style.top = `${topValue - 50}px`;

    //       if (!this.classList.contains("caught")){
    //         this.classList.add("caught");
    if (type.contains("fish")) {
      catchText.innerText = "!!A CATCH!!";
      //ajouter son??! sound.play();

      let audio = new Audio("./sfx/cute-level-up-3-189853.mp3");
      audio.play();

      score++;
      currentScore++;
      console.log(currentScore);
      //TO SHOW!!
      scoreDisplay.innerText = `Score: ${currentScore}`;
      event.target.remove();
    }

    setTimeout(function () {
      clickZone.removeChild(catchText);
    }, 250);

    //  }
  }

  function endGame() {
    clearInterval(moveInterval);
    clearInterval(createFishInterval);
    fishIntervals.forEach((id) => clearInterval(id));
    fishIntervals = [];
    document
      .querySelectorAll("#click-zone .fish")
      .forEach((fish) => fish.remove());
    document.querySelector("#final-score").innerText =
      "Votre score est : " + currentScore;
    document.querySelector("#endgame-popup").style.display = "flex";
    myAudio.pause();
  }
};

/* l'event listener que j'ai ajouté lors de la création du poisson check s'il y a un clique
                                                                                                                                                                                                                                                                                        et fait appel à la fonction catchfish , on check si le type est bien un poisson en verifiant si l'element
                                                                                                                                                                                                                                                                                        cliqué contient la classe "fish" (peut être supprimé) , si le poisson cliqué ne contient pas la class caught on la rajoute
                                                                                                                                                                                                                                                                                        en incremente le score et on l'affiche sur mon score display.*/

/* un text a été ajouté juste à coté de l'endroit du catch pour montrer que la capture a été réalisée
                                                                                                                                                                                                                                                                                        le text se delete après moins d'une seconde (settimeout) */

/******************************* */

/*endgame() dans ce bout de code, je clear ou nettoie tous les intervals créés soit pour de nouveau poisson ou pour le
                                                                                                                                                                                                                                                                                            changment de position des poissons (pour ne pas consommer le cpu et la mémoire), je reinitialise mon tableau (array) d'interval
                                                                                                                                                                                                                                                                                            je nettoie du DOM tous les elements ayant une classe fish et qui sont child direct de la clickzone à l'aide de la 
                                                                                                                                                                                                                                                                                            fct remove();
                                                                                                                                                                                                                                                                                            puis j'affiche le score final et un bouton restart pour redémarrer le jeu.*/

document.addEventListener("DOMContentLoaded", function () {
  // Supposons que vous avez déjà votre élément audio dans votre HTML
  const myAudio = document.getElementById("myAudio"); // Assurez-vous que votre élément audio possède cet ID

  const musicToggleButton = document.getElementById("music-toggle-btn");
  let isMusicPlaying = false; // La musique ne joue pas au départ

  // Fonction pour basculer l'état de la musique
  function toggleMusic() {
    if (isMusicPlaying) {
      myAudio.pause();
    } else {
      myAudio.play();
    }
    isMusicPlaying = !isMusicPlaying; // Change l'état de la musique
    //musicToggleButton.textContent = isMusicPlaying ? "Off" : "On"; // Change le texte du bouton
  }

  // Écouter l'événement de cliquer sur le bouton
  musicToggleButton.addEventListener("click", toggleMusic);
});
