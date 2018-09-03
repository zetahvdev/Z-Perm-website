function cubeFace(x, y, width, height, color, type, initialSpeed) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.type = type;
	this.speed = initialSpeed;
}

cubeFace.prototype.draw = function(ctx, deg) {
	ctx.fillStyle = '#444';
	roundRect(ctx, this.x, this.y, this.width, this.height, this.type, true, true, deg);

	innerfaceWidth = this.width * 0.9;
	innerfaceHeight = this.height * 0.9;
	innerfacePosX = this.x + (this.width - innerfaceWidth) / 2;
	innerfacePosY = this.y + (this.height - innerfaceHeight) / 2;
	//console.log({innerfaceWidth, innerfaceHeight, innerfacePosX, innerfacePosY});   
	ctx.fillStyle = this.color;
	ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
	roundRect(ctx, innerfacePosX, innerfacePosY, innerfaceWidth, innerfaceHeight, this.type, true, false, deg);
}

//vector function 

function faceUpdate(cubeFace, vector) {
	//console.log(cubeFace);
	cubeFace.x += cubeFace.speed;
	cubeFace.speed *= cubeFace.speed < 0.00001 ? 0 : 0.99;
}