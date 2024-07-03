const conn = require('../db/dbConnection');

module.exports = {

  
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


  crearFactura: async(req ,res)=>{
    const {  } = req.body;

    try {
      await conn.query(
        'INSERT INTO facturas() VALUES ()',
        []
      );

    } catch (error) {
      console.error('Error al crear registro:', error);
      res.status(500).json({ error: 'Error al crear registro' });
    }
  },
 mostrarFacturas: async (req, res) => {
    const [facturas] = this.getFacturas();

    facturas.forEach(element => {
        const [detalles] = this.getDetallesByIdFactura(element.id_factura);
    });
 }

}
/*
module.exports = {
    getFacturas: async (req, res) => {
        try {
          const userId = req.user.id;
          const [registros] = await conn.query('SELECT * FROM facturas AS f INNER JOIN detalles AS d ON f.id_factura = d.id_factura ');
          res.json(registros);
        } catch (error) {
          console.error('Error al obtener el listado:', error);
          res.status(500).send('Error al obtener el listado');
        }
      },
    getDetallesByIdFactura: async (req, res) => {
        const [modificar] = await conn.query(`SELECT * FROM detalles WHERE id_factura=?`, req.params.num)
        res.render("modificar", {
         title:"modifico lo que quiero",
         registro: modificar[0]
     })
    },
    
    crearFactura: async (req, res) => {
        const { id_usuario, fecha, fpago, total } = req.body;
        const [detalles] = 
    
        // Validar que los campos no estén vacíos
        if (!id_usuario || !fecha || !fpago) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        try {
          await conn.query(
            'INSERT INTO Facturas (id_usuario, fecha, fpago, total) VALUES (?, ?, ?, ?)',
            [parseInt(nombre), fecha, fpago, parseFloat(precio)],
            
            res.redirect("/pages/carga-datos.html")
          );
          
        } catch (error) {
          console.error('Error al crear factura:', error);
          res.status(500).json({ error: 'Error al crear factura' });
        }
      },   

    crearDetalle: async (req, res) => {
        const { id_facura, id_producto, cantidad, precio } = req.body;
    
        // Validar que los campos no estén vacíos
        if (!id_factura || !id_producto || !cantidad || !precio) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        try {
          await conn.query(
            'INSERT INTO productos (nombre, precio, cantidad, descripcion) VALUES (?, ?, ?, ?)',
            [parseInt(id_factura), parseInt(id_producto), parseInt(cantidad), parseFloat(precio)],
            res.redirect("/pages/carga-datos.html")
          );
          
        } catch (error) {
          console.error('Error al crear detalle:', error);
          res.status(500).json({ error: 'Error al crear detalle' });
        }
      }, 

}
      */