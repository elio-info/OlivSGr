 //reloj de internet
 const canvasRl = document.getElementById('clock_n1');
 const ctx = canvasRl.getContext('2d');
 const radio=canvasRl.height / 4
 
 // set the start point of the hour, minute and second hand to top
 const threePIByTwo = (3 * Math.PI) / 2;
 
 console.log(threePIByTwo);
 
 let amOrPm = 'AM';
 var clockAnimate;
 
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
 
   const date = new Date();
 
   let hr = date.getHours();
   let min = date.getMinutes();
   let sec = date.getSeconds();
   let ms = date.getMilliseconds();
 
   if(hr > 12)
   {
     amOrPm = 'PM';
     hr -= 12;
   }
 
   /* Defines how much radians each hand should move */
   let radH = 0.000008333 * ( ( hr * 60 * 60 * 1000 ) + ( min * 60 * 1000 ) + ( sec * 1000 ) + ms );
   let radM = 0.0001 * ( ( min * 60 * 1000 ) + ( sec * 1000 ) + ms );
   let radS = 0.006 * ( ( sec * 1000 ) + ms );

   let myt=1000 * tiempo_JInterno_div4

// balance de tiempo

    // console.log(`ms ${ms},seg ${sec}, t ${tiempo_JInterno_inicio}`);
    let ang_radMinJuego = rad(tiempo_JInterno_etapas * 90 ) + threePIByTwo
    let ang_radSegJuego = rad( tiempo_JInterno_inicio/myt) + threePIByTwo 
 
   // Draw Canvas
   drawRect(0, 0, canvasRl.width, canvasRl.height, canvasBg);
 
   // Hour Hand
   //drawCircle(centerX, centerY, 110, 0, 360 , false, hourInactiveColor, 'stroke', 90);
   //drawCircle(centerX, centerY, 110, threePIByTwo, rad(radH) + threePIByTwo, false, hourActiveColor, 'stroke', 90);
   // My Game is Hour Hand
   drawCircle(centerX, centerY, radio + 20, 0, 360 , false, hourInactiveColor, 'stroke', 90);
   drawCircle(centerX, centerY, radio + 20, threePIByTwo, ang_radMinJuego , false, hourActiveColor, 'stroke', 90);
   
   // Minute Hand radio medio
   drawCircle(centerX, centerY, radio, 0, 360, false, minuteInactiveColor, 'stroke', 50);//ang_radSegJuego
   drawCircle(centerX, centerY, radio, threePIByTwo, ang_radSegJuego, false, minuteActiveColor, 'stroke', 50);
   
   // Second Hand radio menor
   drawCircle(centerX, centerY,radio - 20, 0, 360, false, secondInactiveColor, 'stroke', 30);
   drawCircle(centerX, centerY,radio - 20, threePIByTwo, rad(radS) + threePIByTwo, false, secondActiveColor, 'stroke', 30);
   
 
   // Digital Timer
   //drawCircle(centerX, centerY, 90, 0, 360, false, timerBg, 'fill', '50');
   drawText(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")} ${amOrPm}`, canvasRl.width / 2 - 60, canvasRl.height / 2 + 15, '#ffffff', '28px');
 
       if (tiempo_JInterno_inicio <= tiempo_JInterno_div4){
      if( tiempo_JInterno_etapas < 4) {
          tiempo_JInterno_inicio ++//= tiempo_JInterno_ang_divX4 
          clockAnimate=requestAnimationFrame(draw);
        }
        else
        {
          // window.cancelAnimationFrame(draw)
          alert('se acabo')
          clockStopAnimate()
        }
    }
    else{
      console.log(
        `hr = ${date.getHours()}
         min = ${date.getMinutes()}
         sec = ${date.getSeconds()}
         ms = ${date.getMilliseconds()}
         `)
      tiempo_JInterno_inicio = 0
      tiempo_JInterno_etapas++    
      clockAnimate=requestAnimationFrame(draw);
    }   
 }
 
 function initClock(tiempo_Juego_minutos)
 {
  //  canvasRl.width = canvasRl.clientWidth - 35;
  //  canvasRl.height = canvasRl.clientHeight - 45;
/*
 para el tiempo: coger la hora del dispositivo
 se toma el tiempo de div que es 4 oportunidades
 reprog min - parte entera 
 reprog seg - parte decimal
  y reprog los tiempo de corte
*/

    tiempo_JInterno = tiempo_Juego_minutos * 60  //para saber cdo llego al final en tiempo en funcion de seg a lo interno
    tiempo_JInterno_div4 = (tiempo_JInterno / 4) * 100 //para saber en cuanto puedo dividir el tiempo de juego para 4 oprtunidades de tiempo en miliseg
    tiempo_JInterno_ang_divX4 = ( 360*tiempo_JInterno_div4)/ 1000  //angulo para mostrar el reloj en seg de juego
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
 
 
 
function clockStopAnimate() {
  cancelAnimationFrame(clockAnimate)
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
       
