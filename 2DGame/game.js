const cvs = document.getElementById('breakOut');
const ctx = cvs.getContext('2d');

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const PADDLE_MARGIN_BOTTOM = 50;

let LIFE = 3;

const BG_IMG = new Image();
BG_IMG.src = 'img/bg.jpg';

let leftArrow = false;
let rightArrow = false;
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        leftArrow = true;
    } else if(event.keyCode == 39) {
        rightArrow = true;
    }
});
document.addEventListener('keyup', function(event) {
    if(event.keyCode == 37) {
        leftArrow = false;
    } else if(event.keyCode == 39) {
        rightArrow = false;
    }
});

function movePaddle() {
    if(leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    } else if(rightArrow && paddle.x < cvs.width - paddle.width) {
        paddle.x += paddle.dx;
    }
}

// DRAWS
const paddle = {
    x: cvs.width/2 - PADDLE_WIDTH/2,
    y: cvs.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx: 5
}
function drawPaddle() {
    ctx.fillStyle = '#2e3548';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = '#ffcd05';
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
};

const BALL_RADIUS = 8;
const ball = {
    x: cvs.width/2,
    y: paddle.y - BALL_RADIUS,
    radius: BALL_RADIUS,
    speed: 5,
    dx: 3,
    dy: -3
}
function drawBall() {
        ctx.beginPath();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        ctx.fillStyle = '#ffcd05';
        ctx.fill();
        ctx.strokeStyle = '#2e3548';
        ctx.stroke();
        ctx.closePath();
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function ballWallCollision() {
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    } else if(ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    if(ball.y + ball.radius > cvs.height) {
        LIFE--;
        resetBall();
    }
}

function resetBall() {
    ball.x = cvs.width/2;
    ball.y = paddle.y - ball.radius;
    ball.dy = -3;
    ball.dx = 3 * (Math.random() * 2 - 1);
}

function ballPaddleCollision() {
    if(ball.y > paddle.y && ball.x < paddle.x + paddle.width && ball.x > paddle.x && ball.y < paddle.y + paddle.height){

        let collidePoint = (ball.x - (paddle.x + paddle.width/2))/ (paddle.width/2);

        let angle = collidePoint * (Math.PI/3);

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -1 * ball.speed * Math.cos(angle);
    }
}

function draw() {
    ctx.drawImage(BG_IMG, 0, 0);
    drawPaddle();
    drawBall();
}

function update() {
    movePaddle();
    moveBall();
    ballWallCollision();
    ballPaddleCollision()
}

function loop() {
    draw();
    update();
    requestAnimationFrame(loop)
}
loop();
