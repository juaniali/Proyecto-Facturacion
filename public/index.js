document.addEventListener('DOMContentLoaded', () => {

  
  const burguer = document.querySelector(".Burguer");
  const navBarLinks = document.querySelector(".navbar-links");

  if (!navBarLinks.classList.contains('active')) {
    navBarLinks.classList.toggle("active");
  }

  const letters = document.querySelectorAll('.letter');
  letters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.1}s`;
  });

  burguer.addEventListener("click", () => {
    navBarLinks.classList.toggle("active");
  });

 
  document.querySelectorAll('.nav-link').forEach(link => {

    link.addEventListener('click', function (event) {
      event.preventDefault(); // Evitar que se cargue la página por defecto

      const nextPage = this.getAttribute('href'); // Obtener la URL de la próxima página

      // Ocultar la página actual con transición
      document.getElementById('content').classList.add('hide');
      window.location.href = nextPage;
    });
  });


  document.querySelector('#iniciar').addEventListener('click',iniciar());

  function iniciar(){
    window.location.href='/pages/login.html';
  }

  document.querySelector('#log-out').addEventListener('click', cerrarSesion());

  function cerrarSesion() {
    location.href = '';
  }

});