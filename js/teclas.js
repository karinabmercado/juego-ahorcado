document.addEventListener('keydown', (event) => {
  var tecla_presionada = event.key.toUpperCase();
  var codigo_ascii = tecla_presionada.charCodeAt();
  

  console.log("tecla: " + tecla_presionada);
  console.log("codigo ascii: " + codigo_ascii);
}, false);

