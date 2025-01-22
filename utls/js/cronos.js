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


onmessage=function (){
  console.log(`es la hora ${now()}`);
  
}


