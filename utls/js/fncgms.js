let terrenos_estados = []
let acc_a_realizar = '',
  acciones = ['nada', 'arar', 'semb', 'regad','chap','insect','poda']
let img_ruta_src = "utls/imgs/gms/"
let tiempo = 6000
let letreros_nvl =
{
  'n1':
  {
    'cabeza': 'Para tener olivos, primero hay que plantar',
    lugar:'tierra',
    fig_inicio:'n1_tierra sin arar.jpg',
    'final':3//acciones[3]='regad'
  },

  "n2": {
    'cabeza': 'Debemos conservar lo que plantamos',
    lugar:'planta',
    fig_inicio:'n2_planta con hierba.jpg',
    'final':6//acciones[6]='poda'    
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

function pasarA(params) {
  // console.log(params);
  cambioDivJuego('portada_gms','infoGrl_n'+params)  
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
  eltoPadre.appendChild(doc_tipo_img);//agrego dentro del elto, la img   
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


function inicioDivJuego(divActual, divSiguiente, nivel, cantTierra, cantHerra = 3) {
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

}

function ponerFotoSerieEnTierra(lugarPoner, cantRepetirImg, nvl, accionRecibe) {
  vaciarElto(lugarPoner)
  for (let index = 0; index < cantRepetirImg; index++) {
    crearImg(nvl + "_" + index, img_ruta_src+'/'+nvl+'/'+ letreros_nvl[nvl].fig_inicio, "imagenScala60", "mostrarCambioEstado('" + nvl + "_" + index + "','" + (index == 0 ? accionRecibe : "") + "');", coger(lugarPoner)
    )
  }
}
/**
 * 
 * @param {*} idImg 
 * @param acc_evento acc_A_Tierrass acc(accion a realizar)_evento(posicion dentro de las acciones a realizar en esa accion) 
 */
function mostrarCambioEstado(idImg, acc_A_Tierrass = '') {
  // coger posicion terreno
  let img_elto = idImg.split('_')
  let nvl_trn = img_elto[0],
    num_trn = img_elto[1],
    img_terreno = coger(idImg)
   // solo accion si el paso sucesivo es el que se acciona
  if (terrenos_estados[num_trn] + 1 == acc_a_realizar) {
    terrenos_estados[num_trn]++
    img_terreno.src = img_ruta_src +'/'+nvl_trn+'/'+ nvl_trn + "_"+letreros_nvl[nvl_trn].lugar+"_" + acciones[acc_a_realizar] + ".jpg"
    acc_a_realizar = ''
  }
  // si todos llegaron a la accion final
  let  specificCharacter=letreros_nvl[nvl_trn].final,
    count_Acc = terrenos_estados.filter(element => element === specificCharacter).length;
// se cumplio con todas las acciones
    if (count_Acc==terrenos_estados.length) {
      // mostrar para el otro nivel
      $('#pasar-prox'+(parseInt(nvl_trn[1])+1)).show()
    }
}

function accion_A_Realizar(trabajo) {
  acc_a_realizar = trabajo
}
/**
 * para la recporduccion y saltar al proximo juego
 * @param {string} params nivel que se pasara
 */
function paraVideo_Jugar(params) {
  //para video
  let perr=coger('#'+params+'_01')
  alert('hay que parar el video antes')
  perr.pause()
  console.log(perr.controlsList);  
  //inicioDivJuego('infoGrl_'+params+'_gms',params+'_gms',params,6)
}
