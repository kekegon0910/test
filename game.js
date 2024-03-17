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
  const block = randomBlock();
  drawMatrix(block, {x: 0, y: 0});
}

setInterval(() => {
  draw();
}, speed);
