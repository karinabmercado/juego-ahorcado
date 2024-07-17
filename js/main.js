// Area agregar nueva palabra
var boton_agregar = document.getElementById('btn-guardar');
var input_palabra = document.getElementById('input-palabra');


function mostrar_popup(mensaje){
  var popup = document.getElementById('myPopup');
  popup.textContent = mensaje;
  popup.classList.add('show');
  setTimeout(function(){
    popup.classList.remove('show');
  }, 4000);
}

boton_agregar.addEventListener('click', function(){
  let palabra_ingresada = input_palabra.value;

  if(palabra_ingresada == 0){
    mostrar_popup('Debe ingresar una palabra');
  }else if(palabra_ingresada.length > 8){
    mostrar_popup('La palabra no puede contener mas de 8 caracteres');
  }else if((/\d/.test(palabra_ingresada)) || (palabra_ingresada.includes(' '))){ // 
    mostrar_popup('La palabra no puede contener numeros o espacios en blanco');
  }else{
    // palabras.push(palabra_ingresada.toUpperCase());
    localStorage.setItem('palabra', palabra_ingresada.toUpperCase());
    window.location = 'juego.html';
  }
});


