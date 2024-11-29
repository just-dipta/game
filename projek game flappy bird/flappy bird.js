// Mengambil elemen canvas
var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');

// Setel dimensi canvas
canvas.width = 400;
canvas.height = 600;

// Definisi beberapa konstanta
var GRAVITY = 0.6;
var JUMP_HEIGHT = -8;
var PIPE_WIDTH = 80;
var PIPE_GAP = 150;
var BIRD_WIDTH = 40;
var BIRD_HEIGHT = 40;

// Definisi objek burung
var bird = {
  x: canvas.width / 4,
  y: canvas.height / 2,
  vy: 0,
  width: BIRD_WIDTH,
  height: BIRD_HEIGHT
};

// Definisi array pipa
var pipes = [];
var score = 0;

// Fungsi untuk menggambar permainan
function draw() {
  // Menghapus canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Menggambar burung
  ctx.fillStyle = 'yellow'; // Warna burung
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
  
  // Menggambar pipa
  ctx.fillStyle = 'green'; // Warna pipa
  for (var i = 0; i < pipes.length; i++) {
    ctx.fillRect(pipes[i].x, 0, PIPE_WIDTH, pipes[i].height); // Pipa atas
    ctx.fillRect(pipes[i].x, pipes[i].y + pipes[i].height + PIPE_GAP, PIPE_WIDTH, canvas.height); // Pipa bawah
  }
  
  // Memperbarui posisi burung
  bird.y += bird.vy;
  bird.vy += GRAVITY;
  
  // Memeriksa tabrakan
  for (var i = 0; i < pipes.length; i++) {
    if (checkCollision(bird, pipes[i])) {
      alert('Game Over! Your score: ' + score);
      document.location.reload(); // Memuat ulang permainan
    }
    
    // Memeriksa apakah burung melewati pipa
    if (pipes[i].x + PIPE_WIDTH < bird.x && !pipes[i].passed) {
      score++;
      pipes[i].passed = true;
    }
  }
  
  // Mengupdate posisi pipa
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].x -= 2; // Memindahkan pipa ke kiri
    if (pipes[i].x < -PIPE_WIDTH) {
      pipes.splice(i, 1); // Menghapus pipa yang sudah keluar dari canvas
      i--; // Mengurangi indeks untuk menjaga konsistensi
    }
  }
  
  // Menggambar pipa baru secara acak 
  if (Math.random() < 0.01) {
    var pipeHeight = Math.random() * (canvas.height - PIPE_GAP - 100) + 20; // Menentukan tinggi pipa
    var pipe = {
      x: canvas.width,
      y: 0,
      height: pipeHeight,
      passed: false
    };
    pipes.push(pipe);
  }
  
  // Mengupdate canvas
  requestAnimationFrame(draw);
}

// Fungsi untuk memeriksa tabrakan
function checkCollision(bird, pipe) {
  if (bird.x + bird.width > pipe.x && bird.x < pipe.x + PIPE_WIDTH) {
    if (bird.y < pipe.height || bird.y + bird.height > pipe.height + PIPE_GAP) {
      return true; // Tabrakan terjadi
    }
  }
  return false; // Tidak ada tabrakan
}

// Menangani input pengguna
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    bird.vy = JUMP_HEIGHT; // Melompat
  }
});

// Mulai permainan
draw();