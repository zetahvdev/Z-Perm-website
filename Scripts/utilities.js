function array2D(length_x, length_y, fill) {
	arr = [];
	for (let i = 0; i < length_x; i++) {
		arr.push([]);
		for (let j = 0; j < length_y; j++) {
			arr[i].push(fill);
		}
	}

	return arr;
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke, deg = 0) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }

  //rotate Rect around its own center
  //under development
  var centerRectX = x + width / 2;
  var centerRectY = y + height / 2;
  var rotatedPoints = {
    //(x + radius.tl, y)
    TopLeftRadius: rotate({x: x + radius.tl, y: y}, centerRectX, centerRectY, deg),
    //(x + width - radius, y)
    TopRight: rotate({x: x + width - radius.tr, y: y}, centerRectX, centerRectY, deg),
    //(x + width, y)
    TopRightWidth: rotate({x: x + width, y: y}, centerRectX, centerRectY, deg),
    //(x + width, y + radius.tr)
    TopRightRadius: rotate({x: x + width, y: y + radius.tr}, centerRectX, centerRectY, deg),
    //(x + width, y + height - radius.br)
    BottomRight: rotate({x: x + width, y: y + height - radius.br}, centerRectX, centerRectY, deg),
    //(x + width, y + height)
    BottomRightWidth: rotate({x: x + width, y: y + height}, centerRectX, centerRectY, deg),
    //(x + width - radius.br, y + height)
    BottomRightRadius: rotate({x: x + width - radius.br, y: y + height}, centerRectX, centerRectY, deg),
    //(x + radius.bl, y + height)
    BottomLeft: rotate({x: x + radius.bl, y: y + height}, centerRectX, centerRectY, deg),
    //(x, y + height)
    BottomLeftWidth: rotate({x: x, y: y + height}, centerRectX, centerRectY, deg),
    //(x, y + height - radius.bl)
    BottomLeftRadius: rotate({x: x, y: y + height - radius.bl}, centerRectX, centerRectY, deg),
    //(x, y + radius.tl)
    TopLeft: rotate({x: x, y: y + radius.tl}, centerRectX, centerRectY, deg),
    //(x, y)
    TopLeftWidth: rotate({x: x, y: y}, centerRectX, centerRectY, deg)
  }

  //draw
  ctx.beginPath();
  ctx.moveTo(rotatedPoints.TopLeftRadius.x, rotatedPoints.TopLeftRadius.y);
  ctx.lineTo(rotatedPoints.TopRight.x, rotatedPoints.TopRight.y);
  ctx.quadraticCurveTo(rotatedPoints.TopRightWidth.x, rotatedPoints.TopRightWidth.y, rotatedPoints.TopRightRadius.x, rotatedPoints.TopRightRadius.y);
  ctx.lineTo(rotatedPoints.BottomRight.x, rotatedPoints.BottomRight.y);
  ctx.quadraticCurveTo(rotatedPoints.BottomRightWidth.x, rotatedPoints.BottomRightWidth.y, rotatedPoints.BottomRightRadius.x, rotatedPoints.BottomRightRadius.y);
  ctx.lineTo(rotatedPoints.BottomLeft.x, rotatedPoints.BottomLeft.y);
  ctx.quadraticCurveTo(rotatedPoints.BottomLeftWidth.x, rotatedPoints.BottomLeftWidth.y, rotatedPoints.BottomLeftRadius.x, rotatedPoints.BottomLeftRadius.y);
  ctx.lineTo(rotatedPoints.TopLeft.x, rotatedPoints.TopLeft.y);
  ctx.quadraticCurveTo(rotatedPoints.TopLeftWidth.x, rotatedPoints.TopLeftWidth.y, rotatedPoints.TopLeftRadius.x, rotatedPoints.TopLeftRadius.y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

/**rotate a giving around an center in coordinates cx and cy
 * @param {Object} point The point to be rotated
 * @param {Number} cx x axis of the pivot
 * @param {Number} cy y axis of the pivot
 * @param {Number} degree angle of rotation
*/
function rotate(point, cx, cy, degree) {
  var c = Math.cos(degree);
  var s = Math.sin(degree);

  point.x -= cx;
  point.y -= cy;

  var newx = point.x * c - point.y * s;
  var newy = point.x * s + point.y * c;

  point.x = newx + cx;
  point.y = newy + cy;

  return point;
}