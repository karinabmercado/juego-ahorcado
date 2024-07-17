//Area juego principal
//Espacio en blanco -> &nbsp

var lista_imagenes = [];
for(let i=0; i<8;i++){
  lista_imagenes[i] = './img/ahorcado-'+i+'.png'; 
}

var palabras = ['AUTO', 'LAPTOP', 'TECLADO','CAFE', 'PANTALLA', 'PLAYA', 'LUNA', 'PYTHON', 'ANGULAR'];
if(localStorage.getItem('palabra')){
  //Si existe una palabra nueva en localstorage se agrega a la lista
  palabras.push(localStorage.getItem('palabra'));
}


var imagen_ahorcado = document.getElementById('imagen-ahorcado');
var letras_acertadas = [];
var teclas_especiales = ['TAB', 'CONTROL', 'ALT', 'META', 'SHIFT', 'CAPSLOCK', 'TAB', 'ENTER', 'NUMLOCK', 'PAGEDOWN', 'END', 'DELETE', 'INSERT', 'HOME', 'PAGEUP', 'SCROLLLOCK', 'PAUSE', 'BACKSPACE', 'ESCAPE', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];

var intentos = 6;
var contador_img = 0;
var contador_letras = 0;

var indice = Math.round(Math.random()*(palabras.length-1));
var palabra_seleccionada = palabras[indice];
var longitud_palabra = palabra_seleccionada.length;
var letras_erradas = document.querySelector('.letras-erradas');
var juego_terminado = false;


for(let i = longitud_palabra; i<8; i++){
  //Modificamos los espacio necesarios para mostrar la palabra
  let num = '.letra-'+i;
  let letter = document.querySelector(num);
  letter.style.display = "none";
}


function cambiar_titulo_momentaneo(color){
  var frase;
  var clase;
  var titulo = document.getElementById('texto-titulo');
  if(color == 'verde'){
    frase = '¡Letra correcta!';
    clase = 'ganaste';
  }else if(color == 'rojo'){
    frase = '¡Letra equivocada!';
    clase = 'perdiste';
  }
  titulo.textContent = frase;
  titulo.classList.add(clase);
  setTimeout(function(){
    titulo.classList.remove(clase);
    titulo.textContent = 'Ingrese una letra...';
  }, 1000);
}

function mostrar_mensaje_final(){
  var mensaje_final = document.querySelector('.overlay'),
  popup_final = document.querySelector('.cuadro-final-juego');
  mensaje_final.classList.add('active');
  popup_final.classList.add('active');
}

let btn_cerrar_mensaje = document.getElementById('btn-cerrar-cuadro');
btn_cerrar_mensaje.addEventListener('click', function(){
  var mensaje_final = document.querySelector('.overlay'),
  popup_final = document.querySelector('.cuadro-final-juego');
  mensaje_final.classList.remove('active');
  popup_final.classList.remove('active');
});


document.addEventListener('keydown', (event) => {
  //Escuchador de eventos para tecla presionada//
  var tecla_presionada = event.key.toUpperCase();
  var codigo_ascii = tecla_presionada.charCodeAt();
  var letras = letras_erradas.textContent;
  
  if(teclas_especiales.includes(tecla_presionada)){
    //Evitamos que se lea alguna de las teclas especiales
    codigo_ascii = 0;
  }
  if(!juego_terminado){
    if((codigo_ascii >= 65) && (codigo_ascii <= 90)){
      //Si la tecla presionada es una letra, continuamos...
      if(palabra_seleccionada.includes(tecla_presionada)){
        //Consultamos si la tecla presionada esta incluida en la palabra
        for(let i=0; i<longitud_palabra;i++){
          if(tecla_presionada == palabra_seleccionada[i]){
            //Si la tecla presionada esta contenida en la posicion de la cadena se visibiliza
            if(intentos >= 0){
              let num = '.letra-'+i;
              let letter = document.querySelector(num);
              letter.textContent = tecla_presionada;
              if(!letras_acertadas.includes(tecla_presionada)){
                contador_letras+=1;
              }
              
            } 
          }
        }
        
        if(intentos >=0){
          if(letras_acertadas.length == 0){
            //Creamos la lista de letras acertadas
            letras_acertadas.push(tecla_presionada);
            cambiar_titulo_momentaneo('verde');
          }else{
            
            if(!letras_acertadas.includes(tecla_presionada)){
              //si la letra no esta contenida en la lista se agrega y suma al contador
              letras_acertadas.push(tecla_presionada);
              if(contador_letras<longitud_palabra){
                cambiar_titulo_momentaneo('verde');
              }
            }
          }
        }
        
        
  
        if(contador_letras >= longitud_palabra){
          //Si se acerto todas las letras
          let titulo = document.querySelector('#texto-titulo');
          titulo.textContent = '¡GANASTE!';
          titulo.classList.remove('perdiste');
          titulo.classList.add('ganaste');
          juego_terminado = true;
          mostrar_mensaje_final();
        }
  
      }else{
        //Si no esta incluida se muestra en letras erradas y te resta un intento
        if(letras.length == 0){
          cambiar_titulo_momentaneo('rojo');
          letras_erradas.textContent = tecla_presionada;
          contador_img+=1;
          imagen_ahorcado.src = lista_imagenes[contador_img];
          intentos-=1;
        }else{
          if(!letras.includes(tecla_presionada)){
            if(intentos > 0 ){
              cambiar_titulo_momentaneo('rojo');
              letras_erradas.textContent = letras+'  '+tecla_presionada;
              contador_img+=1;
              imagen_ahorcado.src = lista_imagenes[contador_img];
              intentos-=1;
            }else{
              imagen_ahorcado.src = lista_imagenes[contador_img];
              let titulo = document.querySelector('#texto-titulo');
              titulo.textContent = '¡PERDISTE!';
              titulo.classList.remove('ganaste');
              titulo.classList.add('perdiste');
              juego_terminado = true;
              mostrar_mensaje_final();
            }
            
            if(intentos == 0){
              contador_img = 7;
            }
            
          }
        }
  
        
      }
  
    }
  }
}, false);

