document.querySelector("body").onload = async () => {
    try {
        const res = await fetch(`http://localhost:3000/pages/carga-datos`);
        const datos = await res.json();
        let listaHtml = document.querySelector("#listado");
        listaHtml.innerHTML = "";

        datos.forEach(registro => {
            listaHtml.innerHTML += `
                <form  method="post" action="/pages/carga-datos?_method=delete" style="display:" >
                <div class="productos_inyectados">
                <h4 class="h4_inyectados">${registro.nombre}</h4>
                
                
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
                    <h4><button><a href="/modificar/${registro.id_producto}">Modificar</a></button></h4>
                    <h4><input type="submit" value="Eliminar"></h4>
                </form>`;
                    
                    
                    
                    
        });
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
};
