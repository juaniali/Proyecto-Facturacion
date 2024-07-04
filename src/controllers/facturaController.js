const conn = require('../db/dbConnection');

module.exports = {



  // get factura y get detalle <-----------------------------------------------------|
  getFacturas: async (req, res) =>{
    try {
      const userId = req.user.id;
      const [registros] = await conn.query('SELECT * FROM facturas');
      res.json(registros);

    } catch (error) {
      console.error('Error al obtener Facturas',error);
      res.status(500).send('Error al obtener facturas');
    }
  },

  getDetallesByIdFactura: async (req, res) => {
    const [detalles] = await conn.query(`SELECT * FROM detalles WHERE id_factura=?`, req.params.num)
    res.render("modificar", {})
    },
  
  // calcular total del precio de la factura, leyendo los precios de cada detalle multiplicado por cantidad
  calcularTotal: (id_factura) => {
    let total = 0;
    const [detalles] = this.getDetallesByIdFactura(id_factura);
    [detalles].forEach((element) => total = total + (detalles.cantidad * detalles.precio))
    return total
    },



  // Crear factura y Crear Detalle <----------------------------------------------------|

  crearFactura: async (req,res) => {
    const { id_usuario, fecha, fpago, total=0 } = req.body;
    const [detalles] = {}  
  
      // Validar que los campos no estén vacíos
      if (!id_usuario || !fecha || !total) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      try {
        //const userId = req.user.id;
        await conn.query(
          `INSERT INTO facturas (id_usuario, fecha, fpago, total) VALUES (?, ?, ?, ?, ${userId})`,
          [id_factura, id_producto, cantidad, parseFloat(total)],
          res.redirect("/pages/carga-datos.html")
        );
        
      } catch (error) {
        console.error('Error al crear registro:', error);
        res.status(500).json({ error: 'Error al crear registro' });
      }
    },

  crearDetalle: async (req, res) => {
      const { id_factura, id_producto, cantidad, precio } = req.body;
      // Validar que los campos no estén vacíos
      if (!id_factura || !id_producto || !cantidad || !precio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      try {
        //const userId = req.user.id;
        await conn.query(
          `INSERT INTO detalles (id_factura, id_productos, cantidad, precio) VALUES (?, ?, ?, ?,${userId})`,
          [id_factura, id_producto, cantidad, parseFloat(precio)],
          res.redirect("/pages/")
        );
        
      } catch (error) {
        console.error('Error al crear registro:', error);
        res.status(500).json({ error: 'Error al crear registro' });
      }
    },



  // get modificar Detalle y get modificar Factura <------------------------------------------|

  getModificarDetalle: async (req, res) => {
    const [modificar] = await conn.query(`SELECT * FROM detalle WHERE id_factura=?`, req.params.num)
    res.render("modificar", {
    title:"modifico lo que quiero",
    registro: modificar[0]
    });
    },
  
  getModificarFactura: async (req, res) => {
    const [modificar] = await conn.query(`SELECT * FROM factura WHERE id_factura=?`, req.params.num)
    res.render("modificar", {
    title:"modifico lo que quiero",
    registro: modificar[0]
    });
    },



// Actualizar detalle y actualizar factura <----------------------------------------------|

  actualizarDetalle: async (req, res) => {
      const sql = `UPDATE detalles SET id_factura = ?, id_producto = ?, cantidad = ?, precio = ? WHERE id_detalle=? `
      const {idActualizar, id_factura, id_producto, cantidad, precio} = req.body
      const modificar = await conn.query(sql,[id_factura, id_producto, cantidad, precio, idActualizar])
      res.redirect("/pages/carga-datos.html")
    },
  
  actualizarFactura: async (req, res) => {        
    const sql = `UPDATE facturas SET id_factura = ?, id_producto = ?, cantidad = ?, precio = ? WHERE id_factura=? `
    const {idActualizar, id_factura, id_producto, cantidad, precio} = req.body
    const modificar = await conn.query(sql,[id_factura, id_producto, cantidad, precio, idActualizar])
    res.redirect("/pages/carga-datos.html")
    },



  // mostrar factura (revisar uso) <--------------------------------------------------------| 
  
  mostrarFacturas: async (req, res) => {
    const [facturas] = this.getFacturas();
    },



  // borrar Facturas y borrar Detalles <----------------------------------------------------|

  deleteFactura: async (req, res) => {
      const eliminado = await conn.query(`DELETE FROM factura WHERE id_factura=?`, req.body.idEliminar)
      res.redirect("/pages/carga-datos.html")
    },

  deleteDetalle: async (req, res) => {
      const eliminado = await conn.query(`DELETE FROM detalles WHERE id_detalle=?`, req.body.idEliminar)
      res.redirect("/pages/carga-datos.html")
    },



  // index <--------------------------------------------------------------------------------|

  index: (req, res) => {
      res.sendFile(__dirname + '/index.html');
    }

}
