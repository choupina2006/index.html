const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const jumpSound = document.getElementById("jump-sound");

let jumping = false;

function jump() {
  if (jumping) return;
  jumping = true;
  player.style.transition = "bottom 0.3s";
  player.style.bottom = "100px";
  jumpSound.play();

  setTimeout(() => {
    player.style.bottom = "0";
    setTimeout(() => jumping = false, 300);
  }, 300);
}

document.body.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});

function moveObstacle() {
  let pos = 600;
  obstacle.style.right = "-50px";
  obstacle.style.display = "block";

  function frame() {
    pos -= 5;
    obstacle.style.right = pos + "px";

    const playerRect = player.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    if (
      playerRect.left < obsRect.right &&
      playerRect.right > obsRect.left &&
      playerRect.bottom >= obsRect.top
    ) {
      alert("لقد خسرت!");
      pos = 600;
    }

    if (pos > -50) {
      requestAnimationFrame(frame);
    } else {
      setTimeout(moveObstacle, 1500);
    }
  }

  frame();
}

moveObstacle();
