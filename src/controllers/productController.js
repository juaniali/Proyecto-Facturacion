const { conn } = require('../db/dbConnection');

module.exports = {
  getListado: async (req, res) => {
    try {
      const [registros] = await conn.query('SELECT * FROM productos ');
      res.json(registros);
    } catch (error) {
      console.error('Error al obtener el listado:', error);
      res.status(500).send('Error al obtener el listado');
    }
  },

  crearRegistro: async (req, res) => {
    const { nombre, precio,imagen, descripcion } = req.body;

    // Validar que los campos no estén vacíos
    if (!nombre || !precio || !imagen || !descripcion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
      await conn.query(
        'INSERT INTO productos (nombre, precio, imagen, descripcion) VALUES (?, ?, ?, ?)',
        [nombre, parseFloat(precio), imagen,descripcion],
        res.redirect("/pages/carga-datos.html")
      );
      
    } catch (error) {
      console.error('Error al crear registro:', error);
      res.status(500).json({ error: 'Error al crear registro' });
    }
  },

  getModificar: async (req, res) => {
   const [modificar] = await conn.query(`SELECT * FROM productos WHERE id_producto=?`, req.params.num)
   res.render("modificar", {
    title:"modifico lo que quiero",
    registro: modificar[0]
})
  },

  actualizar: async (req, res) => {
    const sql = `UPDATE productos SET nombre = ?, precio = ?, imagen = ?, descripcion = ? WHERE id_producto=? `
    const {idActualizar, nombre, precio, imagen, descripcion} = req.body
    const modificar = await conn.query(sql,[nombre, precio, imagen, descripcion,idActualizar ])
    res.redirect("/pages/carga-datos.html")
  },

 
  delete: async (req, res) => {
    const eliminado = await conn.query(`DELETE FROM productos WHERE id_producto=?`, req.body.idEliminar)
    res.redirect("/pages/carga-datos.html")
   },
  index: (req, res) => {
    res.sendFile(__dirname + '/index.html');
  }
};
