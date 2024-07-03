document.addEventListener('DOMContentLoaded', () => {
  
  const loguearse= document.querySelector('#loguearse');
  
  loguearse.addEventListener('click',async()=>{
    let email = document.querySelector(`[name='email']`).value;
    let password = document.querySelector(`[name='password']`).value;
    const resp = await fetch('/login/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email, password})
    });//Envia user y pass a comprobar
  
    if(resp.status === 404){
      throw ("email invalido");
  
    }else if(resp.status === 401){
      throw ("password incorrecto")
    }
  
    const data = await resp.json()//si no hay error recibe el token
    localStorage.setItem("jwt-token",data.token);
  
    document.querySelector('#content').classList.add('hide');
    document.querySelector('#navegacion').classList.replace('hidden', 'show');
  
    window.location.href='/pages/mesas.html';
  });
  
  
  /*
  
    inicioSesion.addEventListener('submit', (e) => {
      // e.preventDefault();
      // let user = document.querySelector('#username');
      // let pass = document.querySelector('#password');
      // if (userValido(user) && passValido(pass)) {
        
  
      //   location.assign('/pages/mesas.html');
      // }
  
  
      if (campoVacio(user)) {
        document.querySelector('#userRequired').classList.replace('hidden', 'show');
      } else {
        document.querySelector('#userRequired').classList.replace('show', 'hidden');
      }
  
      if (userValido(user) && !campoVacio(user)) {
  
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
  
  
  */

});

