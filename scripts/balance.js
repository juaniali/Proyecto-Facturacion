document.addEventListener('DOMContentLoaded', function() {
  const formularioGasto = document.querySelector('#gastos form');
  const inputComentario = document.getElementById('comentarioGasto');
  const inputMonto = document.querySelector('#gastos input[type="number"]');
  const listaGastos = document.querySelector('#gastos ul');
  const totalElemento = document.getElementById('total');

  let gastos = [];

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
});
