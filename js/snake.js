
var cell = 25;
var x = 20;
var y = 20;
var map;
var context;

// snake origin
var snakeX = 7 * cell;
var snakeY = 7 * cell;

var velocityX = 0;
var velocityY = 0;

var snakePart = [];

// apple
var appleX;
var appleY;

// gameover
var gameOver = false;


window.onload = function() {
	document.getElementById("gameoverpage").style.display = "none";
	map = document.getElementById('map');
	map.height = y * cell;
	map.width = x * cell;
	context = map.getContext('2d');

	appleSpawn();
	document.addEventListener("keyup", Move);
	// update();
	setInterval(update, 1000/9);
}

function update() {
	if (gameOver) {
		return;
	}

	context.fillStyle = 'black';
	context.fillRect(0, 0, map.width, map.height);

	// context.fillStyle = 'red';
	// context.fillRect(appleX, appleY, cell, cell);
	const appleimg = new Image();
	appleimg.src = '../images/apple.png';
	context.drawImage(appleimg, appleX, appleY, cell, cell);
	// context.fillRect(appleX, appleY, cell, cell);

	if (snakeX == appleX && snakeY == appleY) {
		snakePart.push([appleX, appleY]);
		appleSpawn();
	}

	for (let i = snakePart.length-1; i > 0; i--) {
		snakePart[i] = snakePart[i-1];
	}
	if (snakePart.length) {
		snakePart[0] = [snakeX, snakeY];
	}

	context.fillStyle = 'green';
	snakeX += velocityX * cell;
	snakeY += velocityY * cell; 
	context.fillRect(snakeX, snakeY, cell, cell);
	for (let i = 0; i < snakePart.length; i++) {
		context.fillRect(snakePart[i][0], snakePart[i][1], cell, cell);
	}

	if (snakeX < 0 || snakeX > x*cell || snakeY < 0 || snakeY > y*cell) {
		gameOver = true;
		document.getElementById("gameoverpage").style.display = "block";
		// const gameoverpage = document.createElement("div");
		// gameoverpage.innerText = "Game Over";
		// document.body.appendChild(gameoverpage);
		// gameoverpage.style.position = "absolute";
		// gameoverpage.style.top = "200px";
		// gameoverpage.style.left = "600px";
		// gameoverpage.style.fontSize = "50px";

	}

	for (let i = 0; i < snakePart.length; i++) {
		if (snakeX == snakePart[i][0] && snakeY == snakePart[i][1]) {
			gameOver = true;
			document.getElementById("gameoverpage").style.display = "block";
		}
	}
}

function Move(e) {
	if ((e.keyCode === 38 || e.keyCode === 87) && velocityY != 1) {
		velocityX = 0;
		velocityY = -1;
	} else if ((e.keyCode === 40 || e.keyCode === 83) && velocityY != -1) {
		velocityX = 0;
		velocityY = 1;
	} else if ((e.keyCode === 37 || e.keyCode === 65) && velocityX != 1) {
		velocityX = -1;
		velocityY = 0;
	} else if ((e.keyCode === 39 || e.keyCode === 68) && velocityX != -1) {
		velocityX = 1;
		velocityY = 0;
	}
}

function appleSpawn() {
	appleX = Math.floor(Math.random() * x) * cell;
	appleY = Math.floor(Math.random() * y) * cell;
}




