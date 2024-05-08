
document.addEventListener('DOMContentLoaded', () => {
  // Recuperar el valor del balance del día del almacenamiento local
  const ventasDia = localStorage.getItem('ventasDia');
  if (ventasDia) {
    // Actualizar el elemento HTML para mostrar el balance del día
    document.getElementById('balanceDiaTexto').innerText = `Ventas del Dia: $${ventasDia}`;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const inputMonto = document.querySelector("#gastos input[type='number']");
  const inputDescripcion = document.querySelector("#gastos input[type='text']");
  const formGastos = document.querySelector("#gastos form");
  const listaGastos = document.querySelector("#gastos ul");

  // Obtener los gastos almacenados en el localStorage
  let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

  // Función para mostrar los gastos en la lista
  function mostrarGastos() {
      listaGastos.innerHTML = "";
      gastos.forEach(gasto => {
          const li = document.createElement("li");
          li.textContent = `${gasto.descripcion}: $${gasto.monto.toFixed(2)} - ${gasto.fecha}`;
          listaGastos.appendChild(li);
      });
  }

  // Función para calcular el total de los gastos
  function calcularTotalGastos() {
      return gastos.reduce((total, gasto) => total + gasto.monto, 0);
  }

  // Mostrar los gastos existentes al cargar la página
  mostrarGastos();

  // Manejar el evento de enviar el formulario de gastos
  formGastos.addEventListener("submit", function(event) {
      event.preventDefault();

      const monto = parseFloat(inputMonto.value);
      const descripcion = inputDescripcion.value;
      const fecha = new Date().toLocaleString(); // Obtiene la fecha actual

      if (!isNaN(monto)) {
          // Agregar el gasto a la lista
          gastos.push({ descripcion, monto, fecha });

          // Actualizar el almacenamiento local
          localStorage.setItem("gastos", JSON.stringify(gastos));

          // Mostrar el nuevo gasto en la lista
          mostrarGastos();

          // Calcular y mostrar el total de los gastos
          const totalGastos = calcularTotalGastos();
          document.querySelector("#total p:nth-of-type(2)").textContent = `Gastos Totales: $${totalGastos.toFixed(2)}`;

          // Limpiar los campos de entrada después de agregar el gasto
          inputMonto.value = "";
          inputDescripcion.value = "";
      }
  });
});
