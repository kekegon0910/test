const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

const scale = 20;
context.scale(scale, scale);

const blocks = [
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
];

function randomBlock() {
  const index = Math.floor(Math.random() * blocks.length);
  return blocks[index];
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'black'; // ブロックを黒で描画
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      } else {
        context.fillStyle = 'white'; // 空白セルを白で描画
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function checkFullLines() {
  let linesCleared = 0;
  for (let y = 0; y < canvas.height / scale; y++) {
    let isFullLine = true;
    for (let x = 0; x < canvas.width / scale; x++) {
      if (context.getImageData(x * scale, y * scale, 1, 1).data[3] === 0) {
        isFullLine = false;
        break;
      }
    }
    if (isFullLine) {
      clearLine(y);
      linesCleared++;
    }
  }
  return linesCleared;
}

function clearLine(y) {
  for (let i = y; i > 0; i--) {
    for (let j = 0; j < canvas.width / scale; j++) {
      const pixel = context.getImageData(j * scale, (i - 1) * scale, 1, 1);
      context.putImageData(pixel, j * scale, i * scale);
    }
  }
}

let score = 0;
let level = 1;
let speed = 1000; // ミリ秒単位での落下速度
let block = randomBlock();
let offset = { x: 0, y: 0 };

function updateScore(linesCleared) {
  score += linesCleared * level * 10; // 消えた行によって与えられる点数を増やす
  document.getElementById('score').innerText = score;
}

function draw() {
  context.fillStyle = '#f0f0f0';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(block, offset);
}

function moveBlock(dx, dy) {
  offset.x += dx;
  offset.y += dy;
}

function rotateBlock() {
  const newBlock = [];
  for (let y = 0; y < block.length; y++) {
    newBlock[y] = [];
    for (let x = 0; x < block[y].length; x++) {
      newBlock[y][x] = block[block[y].length - x - 1][y];
    }
  }
  block = newBlock;
}

function dropBlock() {
  moveBlock(0, 1);
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    moveBlock(-1, 0);
  } else if (event.key === 'ArrowRight') {
    moveBlock(1, 0);
  } else if (event.key === 'ArrowDown') {
    dropBlock();
  } else if (event.key === 'ArrowUp') {
    rotateBlock();
  }
});

setInterval(() => {
  dropBlock();
  const linesCleared = checkFullLines();
  if (linesCleared > 0) {
    updateScore(linesCleared);
  }
  draw();
}, speed);
