 //reloj de internet
 let canvasRl , ctx , radio, clock_Juego,
      nivel_Juego
 
 // set the start point of the hour, minute and second hand to top
 const threePIByTwo = (3 * Math.PI) / 2;
 
 const canvasBg = '#1C1C28';
 
 // Define colors for hour, minute and second hand
 const hourActiveColor = '#39D98A',
   minuteActiveColor = '#3E7BFA',
   secondActiveColor = '#FDAC42';
 
 // Define inactive colors for hour, minute and second hand
 const hourInactiveColor = '#3C4043',
   minuteInactiveColor = '#2E3134',
   secondInactiveColor = '#282A2D';
 
 const timerBg = '#282A2D';

 let tiempo_JInterno,tiempo_JInterno_div4 ,tiempo_JInterno_ang_divX4
 let tiempo_JInterno_inicio,tiempo_JInterno_etapas 
 
 function draw()
 {
   // Finding center point of canvas
   const centerX = canvasRl.width / 2,
     centerY = canvasRl.height / 2; 
    // console.log(clock_Juego,tiempo_JInterno_etapas);
  // balance de tiempo| clock_Juego
      if (tiempo_JInterno_inicio <= tiempo_JInterno_div4 ){
      if( tiempo_JInterno_etapas < 4) {
          tiempo_JInterno_inicio ++//= 
          clockAnimate=requestAnimationFrame(draw);
        }
        else
        {
          // window.cancelAnimationFrame(draw)
          alert('se acabo')
          clockStopAnimate()
          terminarNivel(nivel_Juego)
        }
    }
    else{
      var date =new Date()
      console.log(
        `hr = ${date.getHours()}
         min = ${date.getMinutes()}
         sec = ${date.getSeconds()}
         ms = ${date.getMilliseconds()}
         jinterno = ${tiempo_JInterno}
         `)
      tiempo_JInterno_inicio = 0
      tiempo_JInterno_etapas++    
      clockAnimate=requestAnimationFrame(draw);
      console.log(clock_Juego,tiempo_JInterno_etapas,nivel_Juego);
      
    }  
    // console.log(`ms ${ms},seg ${sec}, t ${tiempo_JInterno_inicio}`);
    let ang_radMinJuego = rad(tiempo_JInterno_etapas * 90 ) + threePIByTwo
    let ang_radSegJuego = (tiempo_JInterno_inicio * tiempo_JInterno_ang_divX4 ) + threePIByTwo //all the round of the clock by angle
    // console.log(perro);
    
   // Draw Canvas
   drawRect(0, 0, canvasRl.width, canvasRl.height, canvasBg); 
   
   // My Game is Hour Hand
   drawClockhands(centerX, centerY, radio + 20 ,ang_radMinJuego,30,hourInactiveColor, hourActiveColor)
   // Minute Hand radio medio
    drawClockhands(centerX, centerY, radio,threePIByTwo,30,minuteInactiveColor, minuteActiveColor)
   
  // Minute Hand radio medio
    drawClockhands(centerX, centerY, radio - 10,ang_radSegJuego , 30,secondInactiveColor, secondActiveColor)   
   
 }

 /**
  * Dibujar la manecilla del reloj
  * @param {int} centerX posicion en X
  * @param {int} centerY posicion en Y
  * @param {float} radio_hora 
  * @param {float} ang_hora 
  * @param {int} grueso 
  * @param {color} colorInactivo 
  * @param {color} colorActivo 
  */
 function drawClockhands(centerX, centerY,radio_hora,ang_hora,grueso,colorInactivo,colorActivo) {
  // Second Hand radio menor
  drawCircle(centerX, centerY,radio_hora, 0, 360, false, colorInactivo, 'stroke', grueso);
  drawCircle(centerX, centerY,radio_hora, threePIByTwo, ang_hora, false, colorActivo, 'stroke',grueso);
  
 }
 
 function initClock(tiempo_Juego_minutos , lugarCanvas)
 {
  //  activar tiempo juego
   clock_Juego= true
  //  nivel del juego
  nivel_Juego=lugarCanvas

   canvasRl = document.getElementById('clock_'+lugarCanvas);
   ctx = canvasRl.getContext('2d');
   radio = canvasRl.height / 4
/*
 para el tiempo: coger la hora del dispositivo
 se toma el tiempo de div que es 4 oportunidades
 reprog min - parte entera 
 reprog seg - parte decimal
  y reprog los tiempo de corte
*/

    tiempo_JInterno = tiempo_Juego_minutos * 60  //para saber cdo llego al final en tiempo en funcion de seg a lo interno
    tiempo_JInterno_div4 = (tiempo_JInterno / 4) * 100 //para saber en cuanto puedo dividir el tiempo de juego para 4 oprtunidades de tiempo en miliseg
    tiempo_JInterno_ang_divX4 = 2 * Math.PI /  tiempo_JInterno_div4 //angulo para mostrar el reloj en seg de juego
    tiempo_JInterno_inicio = 0 //conteo del tiempo en mseg
    tiempo_JInterno_etapas = 0 //conteo de las 4 etapas

    const date = new Date();
  console.log(
   `hr = ${date.getHours()}
    min = ${date.getMinutes()}
    sec = ${date.getSeconds()}
    ms = ${date.getMilliseconds()}
     debe de terminar en  ${date.setMinutes(date.getMinutes()+tiempo_Juego_minutos)}
     `)
    console.log(
      ` tiempo de juego min ${tiempo_Juego_minutos},seg ${tiempo_JInterno}
      tiempo / 4 intentos ${tiempo_JInterno_div4}`
    );
    
   // This calls the draw function repeatedly at a rate of 60 times per second
  clockAnimate=  requestAnimationFrame(draw);	
 }
 
 
 /**
  * Detener el tiempo de llamada
  */
function clockStopAnimate() {
  cancelAnimationFrame(clockAnimate)
  clock_Juego= false 
}
 
 // Convert degree to radians
 function rad(deg){
   return  (Math.PI / 180) * deg;
 }
 
 function drawText(text, x, y, color, size) {
   ctx.font = `${size} "Poppins"`;
   ctx.fillStyle = color;
   ctx.fillText(text, x, y);
 }
 
 function drawRect(x, y, width, height, color) {
   ctx.fillStyle = color;
   ctx.fillRect(x, y, width, height);
 }
 
 function drawArc(x, y, radius, start, end, clockwise)
 {
   ctx.beginPath();
   ctx.arc(x, y, radius, start, end, clockwise);
 }
 
 function drawCircle(x, y, radius, start, end, clockwise, color, type, thickness) {
   switch (type) {
     case 'fill':
       ctx.fillStyle = color;
       drawArc(x, y, radius, start, end, clockwise)
       ctx.fill();
       break;
     case 'stroke':
       ctx.strokeStyle = color;
       ctx.lineWidth = thickness;
       drawArc(x, y, radius, start, end, clockwise)
        ctx.fill();
       ctx.stroke();
       break
   }
 }
       
