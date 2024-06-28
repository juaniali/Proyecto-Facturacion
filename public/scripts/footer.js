document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar elementos del DOM
  const botonCentroAyuda = document.querySelector('.boton-centro-ayuda');
  const modalAyuda = document.querySelector('.modal-ayuda');
  const botonCerrar = document.querySelector('.boton-cerrar');
  const contactoForm = document.querySelector("#contacto-form");
  const inputs = document.querySelectorAll('#contacto-form input, #contacto-form select, #contacto-form textarea');

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


  function campoVacio(campo) {
    if (campo.type === 'checkbox') {
      return !campo.checked;
    }
    return campo.value.trim() === '';
  }

  // Manejar el envío del formulario
  contactoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formularioValido = true;

    inputs.forEach(input => {
      if (campoVacio(input)) {
        input.classList.add('shake');
        formularioValido = false;
      } else {
        input.classList.remove('shake');
      }
    });

    if (formularioValido) {
      alert('Formulario enviado con éxito!');
      modalAyuda.style.display = 'none';
    }
  });

  //para quitar la clase de animación después de la animación
  inputs.forEach(input => {
    input.addEventListener('animationend', () => {
      input.classList.remove('shake');
    });
  });


});


