const burguer = document.querySelector(".Burguer");

const navBarLinks = document.querySelector(".navbar-links");

// var paginaActual = new URL(window.location.href).pathname;
// var navLinks = document.querySelectorAll('.navbar-links a');

// navLinks.forEach( link=>{
//   var linkPath = new URL(link.href).pathname;
//   if(linkPath === paginaActual){
//     link.classList.add('pagina-actual');
//   }
// });


burguer.addEventListener("click", () =>{
    navBarLinks.classList.toggle("active");
});

document.querySelectorAll('.nav-link').forEach(link => {

  link.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que se cargue la página por defecto
    
    const nextPage = this.getAttribute('href'); // Obtener la URL de la próxima página

    // Ocultar la página actual con transición
    document.getElementById('content').classList.add('hide');
    window.location.href = nextPage;
    // Esperar a que termine la transición y luego cargar la nueva página
    // setTimeout(() => {
    //   window.location.href = nextPage;
    // }, 1000); // Tiempo de espera igual al tiempo de transición en CSS
  });
});
    
  