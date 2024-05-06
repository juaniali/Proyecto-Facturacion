const burguer = document.querySelector(".Burguer");

const navBarLinks = document.querySelector(".navbar-links");

var paginaActual = new URL(window.location.href).pathname;
var navLinks = document.querySelectorAll('.navbar-links a');

fetch('components/nav.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('nav').innerHTML = data;
  });

navLinks.forEach( link=>{
  var linkPath = new URL(link.href).pathname;
  if(linkPath === paginaActual){
    link.classList.add('pagina-actual');
  }
});


burguer.addEventListener("click", () =>{
    navBarLinks.classList.toggle("active");
});


    
  