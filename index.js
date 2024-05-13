const burguer = document.querySelector(".Burguer");


burguer.addEventListener("click", () =>{
    navBarLinks.classList.toggle("active");
});


const inicioSesion = document.querySelector("#inicioSesion");
const username = 'abc123';
const password = 'abc123';

inicioSesion.addEventListener('submit',(e)=>{
  e.preventDefault();
  let user = document.querySelector('#username');
  let pass = document.querySelector('#password');
  console.log(inicioSesion);
  if (campoVacio(user)) {
    document.querySelector('#userRequired').classList.replace('hidden','show');
  }else{
    document.querySelector('#userRequired').classList.replace('show','hidden');
  }

  if(campoVacio(pass)){
    document.querySelector('#passRequired').classList.replace('hidden','show');
  }else{
    document.querySelector('#passRequired').classList.replace('show','hidden');
  }

   if(campoVacio(user) && campoVacio(pass)){
   }

})

function campoVacio(input){
  if(input.value === ""){
    return true;
  }
  return false;
}

function validar(input){
  if(input.name === "username"){
    if(input.value != username){
      return false;
    }
  }
  if(input.name === "password"){
    if(input.value != password){
      return false;
    }
  }
  return true;
}

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
    
  