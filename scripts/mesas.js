
const abrirMesa = document.querySelector('#abrir-mesa');
const paginaMesa = document.querySelector('#pagina-mesas');
const ventaMesa = document.querySelector('#venta-mesa');

const mesas = document.querySelectorAll('.mesa');
const numeroMesa = document.querySelector('#numero-mesa');
let mesaSeleccionada = null;
const formButton = document.querySelector('#form-button');


formButton.addEventListener('submit', (e)=>{
  e.preventDefault();
  abrirMesa.classList.replace('visible','oculto');
  ventaMesa.classList.replace('oculto','visible');
});

const colorearBoton = function (event){

  if(mesaSeleccionada){
    mesaSeleccionada.style.backgroundColor = '';
  }

  this.style.backgroundColor = 'lightgreen'
  mesaSeleccionada = this;
  numeroMesa.innerText = this.innerText;
  mostrarFormulario();
}

mesas.forEach(mesa =>{
  mesa.addEventListener('click', colorearBoton);
});

function mostrarFormulario(){
  paginaMesa.classList.replace('centro','izquierda');
  abrirMesa.classList.replace('oculto','visible');
}

