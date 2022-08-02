const main = document.getElementById('main');
const player = document.getElementById('player');
const puck = document.getElementById('puck');

let maxLeft = main.offsetLeft,
  maxRight = maxLeft + main.offsetWidth,
  maxTop = main.offsetTop,
  maxBottom = maxTop + main.offsetHeight;

let playerMaxLeft = maxLeft + player.offsetWidth / 2,
  playerMaxRight = maxRight - player.offsetWidth / 2,
  playerMaxTop = maxTop + player.offsetHeight / 2,
  playerMaxBottom = maxBottom - player.offsetHeight / 2;

window.addEventListener('resize', () => {
  maxLeft = main.offsetLeft;
  maxRight = maxLeft + main.offsetWidth;
  maxTop = main.offsetTop;
  maxBottom = maxTop + main.offsetHeight;

  playerMaxLeft = maxLeft + player.offsetWidth / 2;
  playerMaxRight = maxRight - player.offsetWidth / 2;
  playerMaxTop = maxTop + player.offsetHeight / 2;
  playerMaxBottom = maxBottom - player.offsetHeight / 2;
});

window.addEventListener('mousemove', (e) => {
  if (e.clientX > playerMaxLeft && e.clientX < playerMaxRight) {
    player.style.left = `${e.clientX}px`;
  } else if (e.clientX < playerMaxLeft) {
    player.style.left = `${playerMaxLeft}px`;
  } else if (e.clientX > playerMaxLeft) {
    player.style.left = `${playerMaxRight}px`;
  }

  if (e.clientY > playerMaxTop && e.clientY < playerMaxBottom) {
    player.style.top = `${e.clientY}px`;
  } else if (e.clientY < playerMaxTop) {
    player.style.top = `${playerMaxTop}px`;
  } else if (e.clientY > playerMaxBottom) {
    player.style.top = `${playerMaxBottom}px`;
  }
});

const puckMaxTop = main.offsetTop + puck.offsetHeight / 2;
const puckMaxBottom = main.offsetTop - puck.offsetHeight / 2;

let puckTop = puck.offsetTop - puck.offsetHeight / 2;
let puckLeft = puck.offsetLeft - puck.offsetWidth / 2;

let isMovingDown = true;

let previousTimestamp = 0;
let fpsInterval = 1000 / 24;

const gameOver = (winner) => {
  console.log('Game Over');
};

const movePuck = (timestamp) => {
  const elapsed = timestamp - previousTimestamp;

  if (elapsed > fpsInterval) {
    if (puckTop < maxTop) {
      if (
        puckLeft < player.offsetLeft - player.offsetWidth / 2 ||
        puckLeft > player.offsetLeft + player.offsetWidth / 2
      ) {
        gameOver();
        return;
      }
    }

    if (puck.offsetTop + puck.offsetHeight / 2 > maxBottom) {
      if (
        puckLeft < player.offsetLeft - player.offsetWidth / 2 ||
        puckLeft > player.offsetLeft + player.offsetWidth / 2
      ) {
        gameOver();
        return;
      }
    }

    if (isMovingDown) {
      puck.style.top = `${(puckTop += 5)}px`;
      previousTimestamp = timestamp;
    } else {
      puck.style.top = `${(puckTop -= 5)}px`;
      previousTimestamp = timestamp;
    }

    if (
      puck.offsetTop + puck.offsetHeight / 2 >
      player.offsetTop - player.offsetHeight / 2
    ) {
      if (
        puckLeft > player.offsetLeft - player.offsetWidth / 2 &&
        puckLeft < player.offsetLeft + player.offsetWidth / 2
      ) {
        isMovingDown = false;
      }
    }
  }

  window.requestAnimationFrame(movePuck);
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    player.style.opacity = 1;
    puck.style.opacity = 1;
  }, 800);

  setTimeout(() => {
    movePuck();
  }, 1400);
});
