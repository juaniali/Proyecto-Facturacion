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
    } 
    
    
    /*,

    
    crearFactura: async (req, res) => {
        const { id_factura, id_usuario, fecha, fpago, total } = req.body;
        const [detalles] = this.getDetallesByIdFactura(id_factura)
    
        // Validar que los campos no estén vacíos
        if (!id_factura || !id_usuario || !fecha || !fpago) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        try {
          await conn.query(
            'INSERT INTO Facturas (id_factura, id_usuario, fecha, fpago, total) VALUES (?, ?, ?, ?, ?)',
            [parseInt(nombre), fecha, fpago, parseFloat(precio)],
            
            res.redirect("/pages/carga-datos.html")
          );
          
        } catch (error) {
          console.error('Error al crear factura:', error);
          res.status(500).json({ error: 'Error al crear factura' });
        }
      },   

 mostrarFacturas: async (req, res) => {
    const [facturas] = this.getFacturas();

    facturas.forEach(element => {
        const [detalles] = this.getDetallesByIdFactura(element.id_factura);
    });
 }
*/
}
