window.onload = function () {
  document.getElementById("start-btn").addEventListener("click", function () {
    startGame();
  });

  const clickZone = document.querySelector("#click-zone");
  const monViseur = document.querySelector("#mViseur");
  const startTitle = document.querySelector("#start-title");
  const scoreDisplay = document.querySelector("#score-display");
  const myAudio = document.querySelector("#myAudio");
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

    countdownInterval = setInterval(countdown, 1000);
    startGame();
  });

  function countdown() {
    if (timer > 0) {
      timer--;
      updateTimerDisplay();
    } else {
      clearInterval(countdownInterval);
      clearInterval(moveInterval);
      endGame();
    }
  }

  let countdownInterval = setInterval(countdown, 1000);
  clickZone.focus();
  let mousePosition = {
    x: 0,
    y: 0,
  };

  clickZone.addEventListener("mousemove", monCurseur);
  startGame();
  function monCurseur(event) {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
    monViseur.style.left = mousePosition.x + "px";
    monViseur.style.top = mousePosition.y + "px";
    //console.log(mousePosition.x, mousePosition.y);
  }

  function startGame() {
    // document.getElementById("start-btn").style.display = "none";
    // document.getElementById("game-container").style.display = "flex";
    countdown();
    currentScore = 0;
    startTitle.style.display = "none";
    clickZone.style.display = "block";
    createItems();
    clickZone.focus();
    score = 0;
    currentScore = 0;
  }

  function createItems() {
    createFishInterval = setInterval(createFish, 1000);
  }

  function createFish() {
    let fish = document.createElement("div");
    fish.classList.add("fish");
    clickZone.appendChild(fish);
    setPos(fish);
    fish.addEventListener("click", catchFish);

    setTimeout(function () {
      if (!fish.classList.contains("caught")) {
        fish.classList.add("disappear");
      }
      setTimeout(function () {
        if (clickZone.contains(fish)) {
          clickZone.removeChild(fish);
        }
      }, 500); //frequency fish disappear
    }, 500); //frequency fish created
  }

  function setPos(item) {
    let leftPos = Math.floor(Math.random() * (clickZone.offsetWidth - 100));
    let topPos = Math.floor(
      Math.random() * ((clickZone.offsetHeight / 5) * 3 - 200) +
        clickZone.offsetHeight / 5
    );
    let randomNum = Math.floor(Math.random() * 2);
    //left side
    if (randomNum % 2 === 0) {
      leftPos = Math.floor(Math.random() * (clickZone.offsetWidth / 2 - 100));
      setInterval(function () {
        if (item.classList.contains("fish")) {
          leftPos += 5;
        }
        item.style.left = leftPos + "px";
        item.style.top = topPos + 200 + "px";
      }, 100);
    } else {
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
    }
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
    if (type.contains("fish")) {
      catchText.innerText = "!!A CATCH!!";
      let audio = new Audio("./sfx/cute-level-up-3-189853.mp3");

      //document.getElementById("catchFishAudio").play();

      audio.play();
      score++;
      currentScore++;
      console.log(currentScore);
      scoreDisplay.innerText = `Score: ${currentScore}`;
      event.target.remove();
    }

    setTimeout(function () {
      clickZone.removeChild(catchText);
    }, 250);
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

document.addEventListener("DOMContentLoaded", function () {
  const myAudio = document.getElementById("myAudio");
  const musicToggleButton = document.getElementById("music-toggle-btn");
  let isMusicPlaying = false;
  function toggleMusic() {
    if (isMusicPlaying) {
      myAudio.pause();
    } else {
      myAudio.play();
    }
    isMusicPlaying = !isMusicPlaying;
  }

  musicToggleButton.addEventListener("click", toggleMusic);
});

/*
document.addEventListener('DOMContentLoaded', function() {

  const gameArea = document.querySelector('#catchFishAudio'); 

  gameArea.addEventListener('click', function(event) {
      if (event.target.classList.contains('fish')) {
          catchFish(event);
      }
  });
});
*/
