// Seleccionar elementos del DOM
const botonCentroAyuda = document.querySelector('.boton-centro-ayuda');
const modalAyuda = document.querySelector('.modal-ayuda');
const botonCerrar = document.querySelector('.boton-cerrar');

// Mostrar el modal cuando se presiona el botón "Centro de ayuda"
botonCentroAyuda.addEventListener('click', () => {
    modalAyuda.style.display = 'block';
});

// Cerrar el modal cuando se presiona la "x"
botonCerrar.addEventListener('click', () => {
    modalAyuda.style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === modalAyuda) {
        modalAyuda.style.display = 'none';
    }
});

// Manejar el envío del formulario
const formularioAyuda = document.querySelector('.formulario-ayuda');
formularioAyuda.addEventListener('submit', (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el formulario, como enviarlo a un servidor

    // Mostrar un mensaje de éxito o hacer algo después del envío
    alert('Formulario enviado con éxito!');
    // Cerrar el modal después del envío
    modalAyuda.style.display = 'none';
});
