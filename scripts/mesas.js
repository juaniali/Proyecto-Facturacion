
const abrirMesa = document.querySelector('#abrir-mesa');
const paginaMesa = document.querySelector('#pagina-mesas');
const ventaMesa = document.querySelector('#venta-mesa');
const buttonAbrirMesa = document.querySelector('#button-abrir-mesa');

const mesas = document.querySelectorAll('.mesa');
const numeroMesa = document.querySelector('#numero-mesa');
let mesaSeleccionada = null;


const colorearBoton = function (event){

  if(mesaSeleccionada){
    mesaSeleccionada.style.backgroundColor = '';
  }

  this.style.backgroundColor = 'lightsalmon';
  mesaSeleccionada = this;
  numeroMesa.innerText = this.innerText;
}

mesas.forEach(mesa =>{
  mesa.addEventListener('click', colorearBoton);
});

buttonAbrirMesa.addEventListener('click', (e)=>{
  e.preventDefault();
  abrirMesa.style.display = 'none';
  ventaMesa.style.display = 'flex';
});

