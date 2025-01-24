let time=0,running_time=false,
    interval,initTime='00:00:00'

function actualizarCronom(){
  const horas=Math.floor(time/3600),
        minutos= Math.floor((time % 3600 ) / 60) ,
        segundos = time % 60
        if (segundos%10 ==0) {
            dbprr=document.getElementById('barr')           
                dbprr.style.width=(10+time).toString()+"%"
                dbprr.innerHTML=(10+time).toString()+"%"
        }
        if (time == 25 ) clearInterval(interval)
    return `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}` 
}
function initCronom(lugar_txtCntxt){
  if (!running_time) {
    running_time=true
    interval= setInterval(
        function (){
          time++
          lugar_txtCntxt.innerHTML=actualizarCronom()
        },
        1000 // 1 seg
    )
  }
}
function stopCronom(lugar_txtCntxt){
  clearInterval(interval)
  running_time=false
  lugar_txtCntxt.innerHTML=initTime
}
function resetCronom(lugar_txtCntxt){
  lugar_txtCntxt.innerHTM=stopCronom(L)
  time=0
  lugar_txtCntxt.innerHTM=initCronom()  
}


//clock draw
let clockCanvas,clockCntx,centerX,centerY
// set the start point of the hour, minute and second hand to top
const threePIByTwo = (3 * Math.PI) / 2;
const hourActiveColor = '#39D98A',hourInactiveColor = '#3C4043'
const date = new Date();
class CanvasClock {
  constructor(canvasId) {
    this.clockCanvas=document.getElementById(canvasId)
    this.clockCntx=this.clockCanvas.getContext('2d')
    this.centerX = this.clockCanvas.width / 2,
		this.centerY = this.clockCanvas.height / 2;

/* Defines how much radians each hand should move */
  let hr = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	let ms = date.getMilliseconds();
	let radH = 0.000008333 * ( ( hr * 60 * 60 * 1000 ) + ( min * 60 * 1000 ) + ( sec * 1000 ) + ms );
    // Hour Hand
	drawCircle(this.clockCntx,this.centerX, this.centerY, 110, 0, 360 , false, hourInactiveColor, 'stroke', 90);
	drawCircle(this.clockCntx,this.centerX, this.centerY, 110, threePIByTwo, rad(radH) + threePIByTwo, false, hourActiveColor, 'stroke', 90);
  
  } 


}
// Convert degree to radians
function rad(deg){
	return  (Math.PI / 180) * deg;
}

function drawText(ctx,text, x, y, color, size) {
	ctx.font = `${size} "Poppins"`;
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}

function drawRect(ctx,x, y, width, height, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
}

function drawArc(ctx,x, y, radius, start, end, clockwise)
{
	ctx.beginPath();
	ctx.arc(x, y, radius, start, end, clockwise);
}

function drawCircle(ctx,x, y, radius, start, end, clockwise, color, type, thickness) {
	switch (type) {
		case 'fill':
			ctx.fillStyle = color;
			drawArc(ctx,x, y, radius, start, end, clockwise)
			ctx.fill();
			break;
		case 'stroke':
			ctx.strokeStyle = color;
			ctx.lineWidth = thickness;
			drawArc(ctx,x, y, radius, start, end, clockwise)
			ctx.stroke();
			break
	}
}



