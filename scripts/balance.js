document.addEventListener('DOMContentLoaded', function() {
  const formularioGasto = document.querySelector('#gastos form');
  const inputComentario = document.getElementById('comentarioGasto');
  const inputMonto = document.querySelector('#gastos input[type="number"]');
  const listaGastos = document.querySelector('#gastos ul');
  const totalElemento = document.getElementById('total');
  const listaVentasDia = document.getElementById('listaVentasDia');
  const totalVentasDiaElemento = document.getElementById('totalVentasDia');

  let gastos = [];
  let totalVentasDia = 0;

  formularioGasto.addEventListener('submit', function(event) {
    event.preventDefault();

    const monto = parseFloat(inputMonto.value);
    const comentario = inputComentario.value.trim();
    const fecha = new Date().toLocaleString();

    if (!isNaN(monto) && monto > 0) {
      const gasto = {
        comentario: comentario,
        monto: monto,
        fecha: fecha
      };
      gastos.push(gasto);

      mostrarGastoEnLista(gasto);
      actualizarTotal(gasto.monto);
      guardarVentaParcial(gasto.monto); // Guardar la venta parcial
      reiniciarFormulario();
    } else {
      alert('Ingrese un monto válido.');
    }
  });

  function mostrarGastoEnLista(gasto) {
    const itemLista = document.createElement('li');
    const textoGasto = document.createElement('span');
    textoGasto.innerHTML = `<strong>${gasto.comentario}</strong> - $${gasto.monto.toFixed(2)} ${gasto.fecha}`;
    itemLista.appendChild(textoGasto);
    listaGastos.appendChild(itemLista);
  }

  function actualizarTotal(monto) {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
      total += gastos[i].monto;
    }
    totalElemento.innerText = `Total: $${total.toFixed(2)}`;
  }

  function reiniciarFormulario() {
    inputComentario.value = '';
    inputMonto.value = '';
    inputComentario.focus();
  }

  function guardarVentaParcial(monto) {
    // Generar una clave única para la venta parcial (puedes usar un timestamp)
    const claveVenta = 'ventaParcialBarra_' + Date.now();
    // Guardar el monto de la venta parcial en el almacenamiento local
    localStorage.setItem(claveVenta, monto.toString());
  }

  // Función para mostrar las ventas del día
  function mostrarVentasDelDia() {
    // Limpiar la lista de ventas del día y reiniciar el total
    listaVentasDia.innerHTML = '';
    totalVentasDia = 0;

    // Recuperar todas las ventas almacenadas en el Local Storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('ventaParcialBarra')) {
        const ventaParcial = parseFloat(localStorage.getItem(key));
        totalVentasDia += ventaParcial;
        const itemLista = document.createElement('li');
        itemLista.textContent = `$${ventaParcial.toFixed(2)}`;
        listaVentasDia.appendChild(itemLista);
      }
    }
    // Mostrar el total de ventas del día
    totalVentasDiaElemento.textContent = `Total de Ventas: $${totalVentasDia.toFixed(2)}`;
  }

  // Llamar a la función para mostrar las ventas del día al cargar la página de balance
  mostrarVentasDelDia();
});
