
const abrirMesa = document.querySelector('#abrir-mesa');
const mesas = document.querySelectorAll('.mesa');
const numeroMesa = document.querySelector('#numero-mesa');
let mesaSeleccionada = null;

const colorearBoton = function (event){

  if(mesaSeleccionada){
    mesaSeleccionada.style.backgroundColor = '';
  }

  this.style.backgroundColor = 'lightgreen'
  mesaSeleccionada = this;
  numeroMesa.innerText = this.innerText;

  abrirMesa.classList.remove('.oculto');
}

mesas.forEach(mesa =>{
  mesa.addEventListener('click', colorearBoton);
});