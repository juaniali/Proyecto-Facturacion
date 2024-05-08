
 const productos = document.querySelectorAll('.tarjeta');

 
 productos.forEach(tarjeta => {
     tarjeta.addEventListener('click', () => {
         
         const nombre = tarjeta.getAttribute('data-nombre');
         const cantidad = parseInt(tarjeta.getAttribute('data-cantidad'));
         const precio = parseInt(tarjeta.getAttribute('data-precio'));

         
         agregarProductoAFactura(nombre, cantidad, precio);
     });
     
 });


function agregarProductoAFactura(nombre, cantidad, precio) {
   
    const fila = document.createElement('tr');

    
    fila.innerHTML = `
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>$${precio.toFixed(2)}</td>
    <td>$${(cantidad * precio).toFixed(2)}</td>
    `;

    
    document.querySelector('#factura tbody').appendChild(fila);

   
    actualizarTotalFactura(cantidad * precio);

    
}

 
 function actualizarTotalFactura(precioProducto) {
     
     const totalElemento = document.getElementById('total');
     
     let total = parseFloat(totalElemento.innerText.replace('$', ''));

     total += precioProducto;
     totalElemento.innerText = `$${total.toFixed(2)}`;
 }




document.getElementById('abrirMesa').addEventListener('click', () => {
   
    reiniciarFactura();
});





function reiniciarFactura() {
   
    document.querySelector('#factura tbody').innerHTML = '';

   
    document.getElementById('total').innerText = '$0.00';
}


document.getElementById('abrirMesa').addEventListener('click', () => {
   
    document.getElementById('cuadro').style.display = 'block';
  
    document.getElementById('mensaje').innerText = 'Venta Restaurada';
   
    document.getElementById('totalVenta').style.display = 'none';
});


document.getElementById('cerrarMesa').addEventListener('click', () => {
    const totalVenta = parseFloat(document.getElementById('total').innerText.replace('$', ''));
    
    // Almacenar la venta en el almacenamiento local
    const ventasDia = localStorage.getItem('ventasDia');
    if (ventasDia) {
        localStorage.setItem('ventasDia', parseFloat(ventasDia) + totalVenta);
    } else {
        localStorage.setItem('ventasDia', totalVenta);
    }

    document.getElementById('cuadro').style.display = 'block';
    document.getElementById('mensaje').innerText = 'Venta cerrada';
    document.getElementById('totalVenta').style.display = 'block';
    document.getElementById('totalVenta').innerText = `Total de la venta: $${totalVenta.toFixed(2)}`;
    reiniciarFactura();
});

document.getElementById('cerrarCuadro').addEventListener('click', () => {
   
    document.getElementById('cuadro').style.display = 'none';
});