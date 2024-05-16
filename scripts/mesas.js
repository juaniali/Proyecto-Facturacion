
const abrirMesa = document.querySelector('#abrir-mesa');
const paginaMesa = document.querySelector('#pagina-mesas');
const ventaMesa = document.querySelector('#venta-mesa');
const buttonAbrirMesa = document.querySelector('#button-abrir-mesa');

const mesas = document.querySelectorAll('.mesa');
const numeroMesa = document.querySelector('#numero-mesa');
let mesaSeleccionada = null;

//Mesas--------------------------------------------
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

//Abrir Mesa ------------------------------------------
buttonAbrirMesa.addEventListener('click', (e)=>{
  e.preventDefault();
  abrirMesa.style.display = 'none';
  ventaMesa.style.display = 'flex';
});

//Buscar Procto------------------------------------------
let productos = [];

async function consumirDb(){
  try {
    const db = await fetch('./../db/productos.json');
    const data = await db.json();
    productos = data.productos;
  } catch (error) {
    console.error(error);
  }
}

consumirDb();
const buscar = document.querySelector("#buscar-producto");

buscar.addEventListener("keyup", () => {
  const valorBuscado = buscar.value.toLowerCase();
  const resultados =  productos.filter( producto => producto.nombre.toLowerCase().includes(valorBuscado) );
  mostrarProductos(resultados);
});

function mostrarProductos(productos){
  productos.forEach( producto =>{
    console.log( "Nombre", producto.nombre, "Precio", producto.precio, "img", producto.img );
  });
}