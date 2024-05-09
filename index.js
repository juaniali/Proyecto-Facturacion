const burguer = document.querySelector(".Burguer");


burguer.addEventListener("click", () =>{
    navBarLinks.classList.toggle("active");
});

const navBarLinks = document.querySelector(".navbar-links");

document.querySelectorAll('.nav-link').forEach(link => {

  link.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que se cargue la página por defecto
    
    const nextPage = this.getAttribute('href'); // Obtener la URL de la próxima página

    // Ocultar la página actual con transición
    document.getElementById('content').classList.add('hide');
    window.location.href = nextPage;
  });
});
    
  