
const botonCentroAyuda = document.querySelector('.boton-centro-ayuda');
const modalAyuda = document.querySelector('.modal-ayuda');
const botonCerrar = document.querySelector('.boton-cerrar');

// Mostrar el modal cuando se presiona el botón "Centro de ayuda"
botonCentroAyuda.addEventListener('click', () => {
    modalAyuda.style.display = 'block';
});


botonCerrar.addEventListener('click', () => {
    modalAyuda.style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === modalAyuda) {
        modalAyuda.style.display = 'none';
    }
});


const formularioAyuda = document.querySelector('.formulario-ayuda');
formularioAyuda.addEventListener('submit', (event) => {
    event.preventDefault();
    

    
    alert('Formulario enviado con éxito!');
   
    modalAyuda.style.display = 'none';
});
