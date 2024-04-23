window.onload = function() {
 

    const gameContainer = document.querySelector("#game-container");
    const clickContainer = document.querySelector("#click-container");
    const monViseur = document.querySelector("#mViseur");
    const startTitle = document.querySelector("#start-title");
    const startBtn = document.querySelector("#start-btn");
    const scoreDisplay = document.querySelector('#score-display');

    const myAudio=document.querySelector("#myAudio");
    //const myAudio = document.getElementById("myAudio");

   // myAudio.play();
    
    let timer = 5;
    /*function updateTimerDisplay() {
        document.getElementById('timer').innerText = timer;
      }*/
/*
      function countdown() {
        if (timer > 0) {
          timer--; // Décrémente le minuteur
          updateTimerDisplay(); // Met à jour l'affichage
        }
        else {
            clearInterval(countdownInterval); // Arrête le minuteur
            //alert("Le temps est écoulé !");
            // Vous pouvez ajouter d'autres actions ici, comme terminer le jeu ou cacher des éléments
          }
      }
      */

//      let countdownInterval = setInterval(countdown, 1000); // Appelle countdown toutes les secondes



clickContainer.focus();
    //monViseur.focus();
    let mousePosition = {
        x:0,
        y:0
    }

    /*let position = {
        x: 900,
        y: 470
    }*/
//change let en let.

//music and sounds








let score = 0;
let currentScore = 0;
 //event listeners
    //startBtn.addEventListener("click", startGame);
    
  //  startBtn.addEventListener("click", startGame);
 
  clickContainer.addEventListener("mousemove", monCurseur);
  //document.addEventListener("keydown", monCurseur);
   //document.addEventListener("keydown", handleKeydown);
   startGame ();
   //countdown();
  // clickContainer.addEventListener("keydown", handleKeydown);  




    function monCurseur (event){
        //update cursor co ordinates
        mousePosition.x = event.clientX;
        mousePosition.y = event.clientY;
        //set fishing line to follow cursor
        monViseur.style.left= mousePosition.x+"px";
        monViseur.style.top = mousePosition.y+"px";
    }


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

   //function for playing music (don't know how it works...)




function startGame () {
// Pour jouer le son

  
   // blop.play();
    

   //bgm.play();



    currentScore=0;
    startTitle.style.display = "none";
    clickContainer.style.display = "block";
    createItems();
    clickContainer.focus(); 
    score = 0;
    currentScore=0;

    // Démarrage d'un timer de 20 secondes au début du jeu
    setTimeout(function() {
        // Ici, vous pouvez changer cette partie pour afficher le score de la manière que vous préférez.
       

        if (score > 2) {
            alert("!!!!CONGRATULATIONS!!!!! Votre score est : " + score);
        } else {
            alert("Time is up!! Try again! Votre score est de seulement: " + score);
        }

        location.reload();  
    }, 10000); // 20000 millisecondes = 20 secondes

/*
    setTimeout(function() {
        document.getElementById('final-score').innerText = "`${score}`";
        document.getElementById('score-popup').style.display = 'block';
    }, 5000);
*/
}



function createItems() {
    createFishInterval = setInterval(createFish, 1000);
 
}

function createFish () {
    let fish = document.createElement("div");
    fish.classList.add("item");
    fish.classList.add("fish");
   clickContainer.appendChild(fish);
    setPos(fish);
  fish.addEventListener("click", hit);
   // fish.addEventListener("keydown", event => event.code === "Space" && hit());
   document.addEventListener("keydown", event => event.code === "Space" && hit());

   
    setTimeout(function() {
        if (!fish.classList.contains("caught")){
            fish.classList.add("disappear");
        }
        setTimeout(function() { 
            if (clickContainer.contains(fish)){
                clickContainer.removeChild(fish);
            }
        }, 2000); //frequency fish disappear
    }, 1000); //frequency fish created
}


function setPos(item) {
    let leftPos = Math.floor(Math.random() * (clickContainer.offsetWidth-100));
    let topPos = Math.floor(Math.random() * ((clickContainer.offsetHeight/5*4)-200)+(clickContainer.offsetHeight/5));
   // if it a type of sea creature and is not trash
  
        let randomNum = Math.floor(Math.random()*2);
        //left side
        if (randomNum%2 === 0){
                        leftPos = Math.floor(Math.random() * ((clickContainer.offsetWidth/2)-100));
                        setInterval(function(){
                if (item.classList.contains("fish")) {
                  //leftPos+=5;
                }
              
                item.style.left = leftPos+"px";
                item.style.top = topPos+200+"px";
            }, 100);
           
        }
        //right side
        else {
        
                leftPos = Math.floor(Math.random() * ((clickContainer.offsetWidth/2)-100)+(clickContainer.offsetWidth/2));
          
            setInterval(function(){
                 leftPos-=5;
                 item.style.left = leftPos+"px";
                item.style.top = topPos+200+"px";
            }, 100);
            item.classList.add("right");
        }
        item.style.left = leftPos+"px"
        item.style.top = topPos+200+"px";
    
    //if it is trash
  
}

function hit(event) {
  
        let type = event.target.classList;
        let hitText = document.createElement('span');
        hitText.setAttribute('class','hit-text');
        this.parentNode.insertBefore(hitText,this);
        hitText.style.left = this.style.left;
        hitText.style.top = this.style.top;
        if (!this.classList.contains("caught")){
            this.classList.add("caught");
            if (type.contains("fish")) {
              //hitText.innerText = "+1!";
              //hitText.style.color = "#00ffcd";
                //blop.play();
                score++;
                currentScore++;
                console.log(currentScore);
              
             
            }
          
            setTimeout(function() {
                clickContainer.removeChild(hitText);
            }, 250);
          
        }
    
}

};

document.addEventListener('DOMContentLoaded', function() {
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
        musicToggleButton.textContent = isMusicPlaying ? "Off" : "On"; // Change le texte du bouton
    }

    // Écouter l'événement de cliquer sur le bouton
    musicToggleButton.addEventListener("click", toggleMusic);
});


