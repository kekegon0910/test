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

let score = 0;
let level = 1;
let speed = 1000; // ミリ秒単位での落下速度
let block = randomBlock();
let offset = { x: 0, y: 0 };

function updateScore(linesCleared) {
  score += linesCleared * 10;
  if (score >= level * 200) { // クリア難易度を変更
    level++;
    speed -= 100; // 落下速度を上げる
    // Increase difficulty here
  }
  document.getElementById('score').innerText = score;
  document.getElementById('level').innerText = level;
  if (score >= 300) {
    document.getElementById('game-status').innerText = 'Game Clear!';
  }
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

canvas.addEventListener('touchstart', event => {
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;
  const canvasRect = canvas.getBoundingClientRect();
  const canvasX = touchX - canvasRect.left;
  const canvasY = touchY - canvasRect.top;
  
  if (canvasX < canvas.width / 2) {
    moveBlock(-1, 0); // 左に移動
  } else {
    moveBlock(1, 0); // 右に移動
  }
});

canvas.addEventListener('touchmove', event => {
  event.preventDefault(); // スクロールを防止
  
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;
  const canvasRect = canvas.getBoundingClientRect();
  const canvasX = touchX - canvasRect.left;
  const canvasY = touchY - canvasRect.top;
  
  if (canvasX < canvas.width / 2) {
    moveBlock(-1, 0); // 左に移動
  } else {
    moveBlock(1, 0); // 右に移動
  }
});

canvas.addEventListener('touchend', event => {
  rotateBlock(); // タッチ終了時に回転
});

setInterval(() => {
  draw();
}, speed);
