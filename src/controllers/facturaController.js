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
  }


}