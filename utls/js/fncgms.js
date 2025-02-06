// import * as AudioClass from "./audio.js"
const cantEltsJuego = 4

let terrenos_estados = []
let acc_a_realizar = '',
  acciones = ['nada', 'arar', 'semb', 'regad','chap','insect','poda','recmnl','recsmmkn','recmknk','slcsprc','indstr','fltrng']
let img_ruta_src = "utls/imgs/gms/"
let logroAvance = 0,
  tiempo_de_juego_minutos = 2 // dato en min 
let clockJuego  //juego en tiempo activo
let audioBien,audioMal,audioMusica
let letreros_nvl =
{
  'n1':
  {
    cabeza: `Comenzaremos plantando nuestros olivos y enfrentando emocionantes desaf&iacute;os en el camino. Cada obst&aacute;culo que superemonos acercar&aacute; m&aacute;s a ver crecer nuestro primer retoño.
    <br>
    ¡ Juntos, descubriremos la magia de cuidar la tierra y disfrutar de la naturaleza !
      <br>
      ¡ Es hora de jugar y aprender !      
      <ol>
        <li>Debemos arar la tierra.</li>
        <li>Plantar las posturas.</li>
        <li>Regarlas para que cerzcan.</li>
      </ol>      `,
    lugar:'tierra',
    fig_inicio:'n1_tierra sin arar.jpg',
    final:3 //acciones[3]='regad'
  },

  'n2': {
    cabeza: `Es importante que continuemos disfrutando de nuestras actividades.Revisemos y cuidemos nuestras posturas mientras jugamos.
    <br>
    Es esencial conservar aquello que hemos plantado. 
    <ol>
      <li>Debemos limpiar primero las hierbas que molestan a las posturas...</li>
      <li>Para que crezcan sanas debemos quitar las plagas. Usemos insecticidas.</li>
      <li>Qu&iacute;temos los hojas enfermas. Podar con cuidado...</li>
    </ol>`,
    lugar:'planta',
    fig_inicio:'n2_planta con hierba.jpg',
    final:6 //acciones[6]='poda'    
  },
  'n3':
  {
    cabeza: `Cosechar  olivos, sueño hecho realidad.
    <ol>
      <li>Cosechemos a baja, de forma manual.</li>
      <li>Arbustos medianos, debemos usarl formas semimecanizadas..</li>
      <li>Usaremos para para las robustas, formas mecanizadas.</li>      
    </ol>
    `,
    lugar:'rama',
    fig_Gral:'ninos_arbol_recolect.webp',
    fig_inicio:'n3_rama_baja.webp',
    final:9 //acciones[9]='recmknk'
  },
  'n4': {
    cabeza: `<b>¡ Hola pequeños exploradores'</b> ¿Sabían que detrás de cada grano de gota de aceite de oliva hay un emocionante proceso?
    <ol>
    <li>Primero separaremos las malas de las buenas. Llenar con las buenas las canastas azules.</li>
    <li>Luego prensar para obtener aceite de las olivas</li>
    <li> Debemos filtrar el aceite para mejorar el producto..</li>
    </ol>`,
    lugar:'oil',
    fig_inicio:'n4_oil_campo.jpg',
    final:12, //acciones[12]='acc',
    prox:'Crdts'    
  },
  'n5': {
    cabeza: 'Se trabaja para elabora el aceite de oliva al mercado para su consumo',
    lugar:'oil',
    fig_inicio:'n4_oil_campo.jpg',
    final:12 //acciones[12]='acc'    
  }
}
/**
 * Vaciar el elemento que se pase por parametro
 * @param {*} elto id del elemento
 */
function vaciarElto(elto) {
  let quitarDatos = document.getElementById(elto)
  // 1-vaciar
  while (quitarDatos.firstChild) {
    // The list is LIVE so it will re-index each call
    quitarDatos.removeChild(quitarDatos.firstChild);
  }
}

function mostrarElto(elto) {
  $('#' + elto).classList.remove('oculto')
}

function cargarElts(params) {
  audioBien= new audioJuego('utls/wav/yuju.wav')
  audioMal= new audioJuego('utls/wav/nokid.wav')
  audioMusica= new audioJuego('utls/wav/kidsplaying.mp3')
}

function pasarA(params) {
  // console.log(params);
  if (params>=2 && params<=4) {
    cambioDivJuego('portada_gms','infoGrl_n'+params)
  }
  else{
    // elemto X
    var nivel=`n${params}`
    ponerLetrerosInfoGralNivelX(params)
    
    cambioDivJuego('portada_gms','infoGrl_nX')
  }
    
}


/**
 * crear elemento img con direccion valor, clase que tendra,accion de click y elemeneto al que se subordinara
 * @param {*} id identificador de la img
 * @param {*} dcc ruta de la img
 * @param {*} clss clase que tendra
 * @param {*} acc accion del evento click
 * @param {*} eltoPadre elemento al  que se subordina
 */
function crearImg(id, dcc, clss, acc, eltoPadre) {
  //dentro de la tarjeta completa, agrego el icono del tipo de Doc
  let doc_tipo_img = document.createElement("img");
  doc_tipo_img.id = id
  doc_tipo_img.src = dcc;//poner img lugar valor
  doc_tipo_img.alt = 'alts';
  doc_tipo_img.className = clss;//poner img clase valor
  // doc_tipo_img.setAttribute('style', 'display:none;')
  doc_tipo_img.setAttribute('onclick', acc);//poner img evnt valor

let doc_tipo_spac = document.createElement("span");
  doc_tipo_spac.innerHTML=' '
  
  eltoPadre.appendChild(doc_tipo_img);//agrego dentro del elto, la img
  
  eltoPadre.appendChild(doc_tipo_spac);//agrego dentro del elto, el espacio   
}

function coger(elmnt) {
  return document.getElementById(elmnt)
}

function cambioFondo(id, imag) {
  coger(id).setAttribute('src', img_ruta_src + imag)
}

function cambioDivJuego(divActual, divSiguiente) {
  // ocultar div actual
  $('#' + divActual).fadeOut()
  // mostar proximo div
  $('#' + divSiguiente).fadeIn()
}

function ponerLetrero(lugarPonerLetrero, nvl, orden = '', paso = '') {
  //localizar poner
  let letrero = orden == 'c' ? letreros_nvl[nvl]['cabeza'] : letreros_nvl[nvl]['pasos'][paso]

  // poner letrero
  coger(lugarPonerLetrero).innerHTML = letrero
}

/**
 * Informacion para seccion X
 * */ 
function ponerLetrerosInfoGralNivelX(nvl,orden = '', paso = '') {
  //localizar poner
  let letr= letreros_nvl['n'+nvl],
      id='infoGrl_nX'
  /**InfoGrl */  
  cambioFondo(`${id}_img`, `n${nvl}/n${nvl}_${letr.fig_Gral}`)// cargar img fondo
  coger(`${id}_p`).innerHTML = letr ['cabeza']//letrero cabeza
  /** InfoGrl_nX_gms */
  cambioFondo(`nX_video`, `n${nvl}/n${nvl}_01.mp4`)// cargar video
  coger(`pararVideo_Jugar`).onclick=`paraVideo_Jugar('nX',${nvl})` //agregar el nivel que se jugara
  
   switch (orden) {
    case 'c'://cabeza
     coger(nvl + '_cabeza').innerHTML = letr ['cabeza']
      break;
    case 'p'://paso
    let sup = nvl + '_p' + paso + '_ltr_sup',
        img = nvl + '_p' + paso + '_img',
        inf = nvl + '_p' + paso + '_ltr_inf',
        acc=letr['pasos'][paso]
     coger(sup).innerHTML = acc['sup']
     coger(img).src =img_ruta_src + acc['foto']
     coger(inf).innerHTML = acc['inf']
      break;
    default:      
      break;
  }
  
}

function ponerLetreroGuiaNivel(nvl,orden = '', paso = '') {
  //localizar poner
  let letr= letreros_nvl[nvl]
   switch (orden) {
    case 'c'://cabeza
     coger(nvl + '_cabeza').innerHTML = letr ['cabeza']
      break;
    case 'p'://paso
    let sup = nvl + '_p' + paso + '_ltr_sup',
        img = nvl + '_p' + paso + '_img',
        inf = nvl + '_p' + paso + '_ltr_inf',
        acc=letr['pasos'][paso]
     coger(sup).innerHTML = acc['sup']
     coger(img).src =img_ruta_src + acc['foto']
     coger(inf).innerHTML = acc['inf']
      break;
    default:      
      break;
  }
  
}
function siguientePasoNivelGuia(nivel, paso) {
  // mostrar guia nvl_paso_letrero
  $('#' + nivel + '_p' + paso + '_card').fadeIn()
  //llenar guia ltr superior paso
  
  ponerLetreroGuiaNivel( nivel, 'p', paso++)
  // ponerLetrero(inf, 'n' + nivel, 'p', inicio + 1)

  // mostar proximo nvl_paso
 if(paso<6 ) $('#' + nivel + '_p' + paso  + '_ltr').fadeIn()
}


function inicioDivJuego(divActual, divSiguiente, nivel, cantTierra = cantEltsJuego, cantHerra = 3) {
  // cambio de pantalla a inicio de juego
  cambioDivJuego(divActual, divSiguiente)
  // cambio estados
  for (let index = 0; index < cantTierra; index++) {
    terrenos_estados[index] = (parseInt(nivel[1]) - 1) * 3//se mueve de a 3 por Nivel
  }
  // oculto letrero guia
  //$('#guia_' + nivel)[0].setAttribute('style', 'display:none;');
  // lleno de tierra
  ponerFotoSerieEnTierra(nivel+"_tierra_row", cantTierra, nivel, acciones[1] + '_0')
   // pongo letrero dentro en la pantalla juego Nivel ?
  ponerLetreroGuiaNivel( nivel, 'c')

  // puntuacion a 0 de nivel
  logroAvance = 0

  // sonar musica de juego
  //sonarJuego= 
 // audioMusica.sonarJuego()

//  tiempo
contarTiempo(nivel)
  
}

function contarTiempo(nivel){
  // comienza reloj  
    // alert(tiempo_de_juego_minutos)
    initClock(1,nivel)
    clockJuego=true //juego en tiempo activo
    
}


function ponerFotoSerieEnTierra(lugarPoner, cantRepetirImg, nvl, accionRecibe) {
  vaciarElto(lugarPoner)
  for (let index = 0; index < cantRepetirImg; index++) {
    crearImg(nvl + "_" + index, img_ruta_src+'/'+nvl+'/'+ letreros_nvl[nvl].fig_inicio, "imagenScala", "mostrarCambioEstado('" + nvl + "_" + index + "','" + (index == 0 ? accionRecibe : "") + "');", coger(lugarPoner)
    )
  }
}
/**
 * Cambiar de estado la imagen que se tocó.Se libera la acción.
 * Si ya es el ultimo estado en que pede estar el nivel jugando,se muestra culminación.
 * @param {*} idImg 
 * @param acc_evento acc_A_Tierrass acc(accion a realizar)_evento(posicion dentro de las acciones a realizar en esa accion) 
 */
function mostrarCambioEstado(idImg, acc_A_Tierrass = '') {
  // coger posicion terreno
  let img_elto = idImg.split('_')
  let nvl_trn = img_elto[0],
    num_trn = img_elto[1],
    img_terreno = coger(idImg)

    console.log( clockJuego, logroAvance, clock_Juego);
    

  if (clock_Juego) { // se puede jugar
      // solo accion si el paso sucesivo es el que se acciona
    if (terrenos_estados[num_trn] + 1 == acc_a_realizar) {
      terrenos_estados[num_trn]++
      img_terreno.src = img_ruta_src +nvl_trn+'/'+ nvl_trn + "_"+letreros_nvl[nvl_trn].lugar+"_" + acciones[acc_a_realizar] + ".jpg"
      acc_a_realizar = ''
      // sonar todo bien
      audioBien.sonarAudio()

      puntuacionCoordinar()  //puntuacion
    }
    else {
      // sonar todo mal
      audioMal.sonarAudio()    
    }
  } // fin tiempo disponible

  terminarNivel(nvl_trn)
        
}

function terminarNivel(nvl_trn) {

  // si todos llegaron a la accion final
  let  specificCharacter=letreros_nvl[nvl_trn].final,
    count_Acc = terrenos_estados.filter(element => element === specificCharacter).length;
  // se cumplio con todas las acciones
  if (count_Acc==terrenos_estados.length || clock_Juego) {
    // parar reloj
    clockStopAnimate()  
    audioMusica.play() //fin de juego y musica
  
   } 
   
  switch (logroAvance) {
    case '< 5':
      mostrarElto(nvl_trn+'_glob').src=img_ruta_src + `grls/mejorarpuntuacion.svg`
      break;
  
    default:
      break;
  } 
  // mostrar para el otro nivel
  let nxt=letreros_nvl[nvl_trn].prox!=undefined? letreros_nvl[nvl_trn].prox:(parseInt(nvl_trn[1])+1)
  $('#pasar-prox'+ nxt).show()    
  
}

function puntuacionCoordinar() {
  logroAvance++
// estrellas poner
}

function accion_A_Realizar(trabajo) {
  acc_a_realizar = trabajo
}
/**
 * Detener la recporduccion y saltar al proximo juego
 * @param {string} params nivel que se pasara
 * @nvl {string} numero del nivel
 */
function paraVideo_Jugar(params,nvl='') {
  //para video
  coger(params+'_01').pause()
  inicioDivJuego('infoGrl_'+params+'_gms',params+'_gms',nvl==''?params:nvl, cantEltsJuego)
}

/**
 * 
 * @param {String} event_call event who call's 
 */
function displayDim(event_call){

  function pageWidth() {
    return window.innerWidth != null? window.innerWidth : document.documentElement &&
    document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null
    ? document.body.clientWidth : null;
    }
    function pageHeight() {
    return window.innerHeight != null? window.innerHeight : document.documentElement &&
    document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body !=
    null? document.body.clientHeight : null;
    }


  let display_dim={
    with_resp:pageWidth(),
    height_resp:pageHeight()
  }
  let div_terra=document.getElementById('n2_tierra_row')

  console.log(event_call,display_dim);
  console.log('class posc-fondo-div-tierra w',div_terra.clientWidth);
  console.log(`div_terra.clientWidth ${div_terra.clientWidth / cantEltsJuego}`);
  
}

function finDivJuego(param ){
  cambioDivJuego(param,'infoGrl_nX')
}


function Salir(){
  window.location.href='index.html'
}
