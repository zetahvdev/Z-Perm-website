var colors = [
	'#f0fa00',
	'#f98413',
	'#0075fa',
	'#008101',
	'#5c0000',
	'#eee'
]

var faceTypes = [
	{ tr: 10, tl: 20, br: 10, bl: 20 },
	{ tr: 20, tl: 20, br: 20, bl: 20 },
	{ tr: 10, tl: 10, br: 10, bl: 20 },
	{ tr: 20, tl: 10, br: 20, bl: 10 }
]

var canvas = document.getElementById('header-canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.7;
const centerW = canvas.width / 2;
const centerH = canvas.height / 2

c.fillStyle = '#eee';
c.fillRect(0, 0, canvas.width, canvas.height);
//code

for (let i = 0; i < 20; i++) {
	var cb = new cubeFace(Math.random() * canvas.width, Math.random() * canvas.height, 50, 50, colors[Math.round(Math.random() * 6)], faceTypes[Math.round(Math.random() * 3)], 10);
	cb.draw(c, Math.random() * 10);
	
}