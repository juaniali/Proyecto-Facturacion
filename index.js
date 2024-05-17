document.addEventListener('DOMContentLoaded', () => {
  
  const burguer = document.querySelector(".Burguer");
  const inicioSesion = document.querySelector("#inicioSesion");
  const username = 'abc123';
  const password = 'abc123';
  const navBarLinks = document.querySelector(".navbar-links");

  burguer.addEventListener("click", () => {
    navBarLinks.classList.toggle("active");
  });

  inicioSesion.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = document.querySelector('#username');
    let pass = document.querySelector('#password');

    if (userValido(user) && passValido(pass)) {
      document.querySelector('#content').classList.add('hide');
      document.querySelector('#navegacion').classList.replace('hidden', 'show');

      location.href = '/pages/mesas.html';
    }

    if (campoVacio(user)) {
      document.querySelector('#userRequired').classList.replace('hidden', 'show');
    } else {
      document.querySelector('#userRequired').classList.replace('show', 'hidden');
    }

    if (userValido(user) && !campoVacio(user)) {
      document.querySelector('#userValidate').classList.replace('show', 'hidden');

    } else {
      document.querySelector('#userValidate').classList.replace('hidden', 'show');
    }

    if (campoVacio(pass)) {
      document.querySelector('#passRequired').classList.replace('hidden', 'show');
    } else {
      document.querySelector('#passRequired').classList.replace('show', 'hidden');
    }

    if (passValido(pass) && !campoVacio(pass)) {
      document.querySelector('#passValidate').classList.replace('show', 'hidden');
    } else {
      document.querySelector('#passValidate').classList.replace('hidden', 'show');
    }
  })

  function campoVacio(input) {
    if (input.value === "") {
      return true;
    }
    return false;
  }

  function userValido(input) {
    if (input.value != username && input != null) {
      return false;
    }
    return true;
  }

  function passValido(input) {
    if (input.value != password && input != null) {
      return false;
    }
    return true;
  }



  document.querySelectorAll('.nav-link').forEach(link => {

    link.addEventListener('click', function (event) {
      event.preventDefault(); // Evitar que se cargue la página por defecto

      const nextPage = this.getAttribute('href'); // Obtener la URL de la próxima página

      // Ocultar la página actual con transición
      document.getElementById('content').classList.add('hide');
      window.location.href = nextPage;
    });
  });

});