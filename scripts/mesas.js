document.addEventListener('DOMContentLoaded', () => {
  const abrirMesa = document.querySelector('#abrir-mesa');
  const ventaMesa = document.querySelector('#venta-mesa');

  const abrirMesaForm = document.getElementById('abrir-mesa-form');
  const cerrarMesaForm = document.getElementById('cerrar-mesa-form');
  
  const mesas = document.querySelectorAll('.mesa');
  const numeroMesa = document.querySelector('#numero-mesa');

  let mesaSeleccionada = null;
  let mesasData = {};
  let currentMesaId;
  let productos = [];

  consumirDb();

  const buscar = document.querySelector("#buscar-producto");
  const contenedorProductos = document.querySelector("#listado-productos");
  const fragmento = document.createDocumentFragment();

  // Mesas--------------------------------------------
  function colorearBoton(event) {
    event.preventDefault();
    if (mesaSeleccionada) {
      mesaSeleccionada.style.border = 'none';
    }
    const clickedMesa = event.currentTarget;
    clickedMesa.style.border = '5px solid #db9834';
    mesaSeleccionada = clickedMesa;
    numeroMesa.innerText = clickedMesa.innerText;
  }

  mesas.forEach(mesa => {
    if(mesasData[currentMesaId] != null){
      mesa.style.backgroundColor= '#45a049';
    }
    mesa.addEventListener('click', (event) => {
      colorearBoton(event);
      currentMesaId = mesa.getAttribute('data-id');

      reiniciarFactura(); // Limpia la factura al cambiar de mesa
      abrirMesaForm.reset();

      if (!mesasData[currentMesaId]) {
        abrirMesa.style.display = 'flex';
        ventaMesa.style.display = 'none';
      } else {
        abrirMesa.style.display = 'none';
        ventaMesa.style.display = 'flex';
        // Mostrar productos ya pedidos, si existen
        mostrarProductosEnFactura(mesasData[currentMesaId].pedidos);
      }
    });
    
  });

  // Abrir Mesa ------------------------------------------
  abrirMesaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const personas = document.getElementById('personas').value;
    const camarero = document.getElementById('camarero').value;
    const comentario = document.getElementById('comentario').value;

    mesasData[currentMesaId] = {
      personas: parseInt(personas, 10),
      camarero: camarero,
      comentario: comentario,
      pedidos: []
    };

    abrirMesa.style.display = 'none';
    ventaMesa.style.display = 'flex';
  });

  cerrarMesaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const totalVenta = parseFloat(document.getElementById('total').innerText.replace('$', ''));
    reiniciarFactura();
    capturarVenta(totalVenta); // Llamada a la función para almacenar el total de la venta
    // Reiniciar datos de la mesa
    mesasData[currentMesaId] = null;
    
    abrirMesa.style.display = 'flex';
    ventaMesa.style.display = 'none';
  
    abrirMesaForm.reset();
  });

  // Buscar Producto ------------------------------------------
  async function consumirDb() {
    try {
      const db = await fetch('./../db/productos.json');
      const data = await db.json();
      productos = data.productos;
      mostrarProductos(productos); // Mostrar productos al cargar la página
    } catch (error) {
      console.error(error);
    }
  }

  buscar.addEventListener("keyup", () => {
    const valorBuscado = buscar.value.toLowerCase();
    const resultados = productos.filter(producto => producto.nombre.toLowerCase().includes(valorBuscado));
    limpiarProductos();
    mostrarProductos(resultados);
  });

  function mostrarProductos(productos) {
    productos.forEach(producto => {
      let li = document.createElement("li");
      li.className = "tarjeta";
      li.setAttribute('data-nombre', producto.nombre);
      li.setAttribute('data-precio', producto.precio);

      let nombre = document.createElement("p");
      nombre.textContent = producto.nombre;
      nombre.className = "nombre-producto";
      li.appendChild(nombre);

      let precio = document.createElement("p");
      precio.textContent = `$${producto.precio.toFixed(2)}`;
      precio.className = "precio-producto";
      li.appendChild(precio);

      let imagen = document.createElement("img");
      imagen.src = producto.img;
      imagen.className = "imagen-tarjeta";
      li.appendChild(imagen);

      li.addEventListener('click', () => {
        agregarProductoAFactura(producto.nombre, parseFloat(producto.precio));
      });

      fragmento.appendChild(li);
    });
    contenedorProductos.appendChild(fragmento);
  }

  function limpiarProductos() {
    while (contenedorProductos.firstChild) {
      contenedorProductos.removeChild(contenedorProductos.firstChild);
    }
  }

  //Factura---------------------------------------------------
  function agregarProductoAFactura(nombre, precio) {

    // Agregar producto al array de pedidos de la mesa
    if (mesasData[currentMesaId]) {
      mesasData[currentMesaId].pedidos.push({ nombre, precio });
    }
    reiniciarFactura();
    mostrarProductosEnFactura(mesasData[currentMesaId].pedidos);
  }

  function actualizarTotalFactura(precioProducto) {
    const totalElemento = document.getElementById('total');
    let total = parseFloat(totalElemento.innerText.replace('$', ''));
    total += precioProducto;
    totalElemento.innerText = `$${total.toFixed(2)}`;
  }

  function reiniciarFactura() {
    document.querySelector('#factura tbody').innerHTML = '';
    document.getElementById('total').innerText = '$0.00';
  }

  function mostrarProductosEnFactura(pedidos) {
    pedidos.forEach(pedido => {
      const fila = document.createElement('tr');
      fila.className= 'dato-factura';
      fila.innerHTML = `
      <td>${pedido.nombre}</td>
      <td>$${pedido.precio.toFixed(2)}</td>
    `;
      document.querySelector('#factura tbody').appendChild(fila);
      actualizarTotalFactura(pedido.precio);
    });
  }

  document.getElementById('reiniciarMesa').addEventListener('click', () => {
    reiniciarFactura();
    mostrarMensaje('Venta Restaurada');
  });

  document.getElementById('cerrarCuadro').addEventListener('click', () => {
    ocultarMensaje();
  });

  function mostrarMensaje(mensaje, detalle = '') {
    const cuadro = document.getElementById('cuadro');
    cuadro.style.display = 'block';
    document.getElementById('mensaje').innerText = mensaje;
    document.getElementById('totalVenta').innerText = detalle;
    document.getElementById('totalVenta').style.display = detalle ? 'block' : 'none';
  }

  function ocultarMensaje() {
    document.getElementById('cuadro').style.display = 'none';
  }

  // Función para capturar y almacenar el total de la venta en la página de barra
  function capturarVenta(totalVenta) {
    if (localStorage.getItem('ventaParcialBarra') == null) {
      localStorage.setItem('ventaParcialBarra', totalVenta);
    } else {
      let acumulado = parseInt(localStorage.getItem('ventaParcialBarra'));
      totalVenta += acumulado;
      localStorage.setItem('ventaParcialBarra', totalVenta);
    }
  }

});
