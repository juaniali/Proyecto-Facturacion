document.querySelector("body").onload = async () => {
  const form = document.querySelector('#carga-datos');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('userId');
      console.log(token);
      const res = await fetch('http://localhost:3000/pages/carga-datos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Envía el token en el encabezado de autorización
        }
      });
      const datos = await res.json();
      let listaHtml = document.querySelector("#listado");
      listaHtml.innerHTML = "";

      datos.forEach(registro => {
        listaHtml.innerHTML += `
        <form class="form_inyectado" method="post" action="/pages/carga-datos?_method=delete" style="display:" >
          <div class="productos_inyectados">
            <h4 class="h4_inyectados">${registro.nombre}</h4>
          </div>
                
          <div class="productos_inyectados">
            <h4 class="h4_inyectados">${registro.precio}</h4>
          </div>

          <div class="productos_inyectados">
            <h4 class="h4_inyectados">${registro.imagen}</h4> 
          </div>

          <div class="productos_inyectados">
            <h4 class="h4_inyectados">${registro.descripcion}</h4>  
          </div>
          
          <input type="hidden" name="idEliminar" value="${registro.id_producto}">
          <button class="boton_inyectado_modificar"><a href="/modificar/${registro.id_producto}">Modificar</a></button>
          <input class="boton_intectados_eliminar" type="submit" value="Eliminar">
        </form>`;

      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  });
}
