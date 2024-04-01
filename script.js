const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
const snakeSpeed = 200;

let snake = [{ x: 200, y: 200 }];
let food = { x: getRandomPosition(), y: getRandomPosition() };
let dx = 0;
let dy = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const keyPressed = event.key;
  if (keyPressed === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -box;
  } else if (keyPressed === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = box;
  } else if (keyPressed === "ArrowLeft" && dx === 0) {
    dx = -box;
    dy = 0;
  } else if (keyPressed === "ArrowRight" && dx === 0) {
    dx = box;
    dy = 0;
  }
}

function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x, segment.y, box, box);
    ctx.strokeStyle = "white";
    ctx.strokeRect(segment.x, segment.y, box, box);
  });
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
  ctx.strokeStyle = "white";
  ctx.strokeRect(food.x, food.y, box, box);
}
//creates ranom position for food
function getRandomPosition() {
  return Math.floor(Math.random() * (canvasSize / box)) * box;
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }; //  we are only changing values of x and y in accordance to movement
  snake.unshift(head); // used to make snake look like moving

  if (head.x === food.x && head.y === food.y) {
    food = { x: getRandomPosition(), y: getRandomPosition() };
  } else {
    snake.pop(); // diappears the last box incase the food is not eaten
  }
}

function checkCollision() {
  // Check if the snake's head has gone out of boundary and reappear on other side
  if (snake[0].x >= canvasSize) {
    snake[0].x = 0;
  } else if (snake[0].x < 0) {
    snake[0].x = canvasSize - box;
  } else if (snake[0].y >= canvasSize) {
    snake[0].y = 0;
  } else if (snake[0].y < 0) {
    snake[0].y = canvasSize - box;
  }

  // Check if the snake's head collides with its body
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(gameInterval);
      alert("Game Over!");
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

const gameInterval = setInterval(gameLoop, snakeSpeed);
