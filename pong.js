const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10, paddleHeight = 50, playerSpeed = 2.5, aiSpeed = 1.5;
const player = { x: canvas.width - paddleWidth, y: canvas.height / 2, width: paddleWidth, height: paddleHeight, dy: playerSpeed, score: 0 };
const opponent = { x: 0, y: canvas.height / 2, width: paddleWidth, height: paddleHeight, dy: aiSpeed, score: 0 };

const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speed: 2, dx: 2, dy: 2 };

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function drawText(text, x, y, color, size) {
    context.fillStyle = color;
    context.font = size + 'px Arial';
    context.fillText(text, x, y);
}

function measureText(text, size) {
    context.font = size + 'px Arial';
    return context.measureText(text).width;
}

function drawMiddleLine() {
    for(let i = 0; i <= canvas.height; i+=20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, '#fff');
    }
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clear();
    drawRect(player.x, player.y, player.width, player.height, '#fff');
    drawRect(opponent.x, opponent.y, opponent.width, opponent.height, '#fff');
    drawMiddleLine();
    drawCircle(ball.x, ball.y, ball.radius, '#fff');

    ball.x += ball.dx;
    ball.y += ball.dy;

    if(player.y < 0) player.y = 0;
    if(player.y + player.height > canvas.height) player.y = canvas.height - player.height;

    if(opponent.y + opponent.height / 2 < ball.y) {
        opponent.y += opponent.dy;
    } else {
        opponent.y -= opponent.dy;
    }

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1; 
    }

    if(ball.x + ball.radius > canvas.width) {
        opponent.score += 1;
        resetBall();
    } else if(ball.x - ball.radius < 0) {
        player.score += 1;
        resetBall();
    }

    if(ball.x + ball.radius > player.x && ball.y > player.y && ball.y < player.y + player.height) {
        ball.dx *= -1.1;
    }

    if(ball.x - ball.radius < opponent.x + opponent.width && ball.y > opponent.y && ball.y < opponent.y + opponent.height) {
        ball.dx *= -1.1;
    }

    const playerScoreText = player.score.toString();
    const playerLabelText = 'Founders and Coders';
    const opponentScoreText = opponent.score.toString();
    const opponentLabelText = '#1 AI';

    drawText(playerScoreText, 3 * canvas.width / 4 - measureText(playerScoreText, 20) / 2, canvas.height / 5, '#fff', 20);
    drawText(playerLabelText, 3 * canvas.width / 4 - measureText(playerLabelText, 14) / 2, canvas.height / 5 + 30, '#fff', 14);
    
    drawText(opponentScoreText, canvas.width / 4 - measureText(opponentScoreText, 20) / 2, canvas.height / 5, '#fff', 20);
    drawText(opponentLabelText, canvas.width / 4 - measureText(opponentLabelText, 14) / 2, canvas.height / 5 + 30, '#fff', 14);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 2;
    ball.dy = 2;
}

function movePaddle(e) {
    let rect = canvas.getBoundingClientRect();
    player.y = e.clientY - rect.top - player.height / 2;
}

canvas.addEventListener('mousemove', movePaddle);

function loop() {
    update();
    if(typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(loop, 16);
}

loop();

window.onload = function() {
    document.getElementById('background-music').play();
}
