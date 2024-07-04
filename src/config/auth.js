const jwt = require('jsonwebtoken');
const jwtconfig = require('./jwtconfig');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log('No auth header');
    return res.status(403).send({ auth: false, message: 'No se proveyó un token' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    console.log('No token found');
    return res.status(403).send({ auth: false, message: 'Token errado' });
  }

  jwt.verify(token, jwtconfig.secretKey, (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err);
      return res.status(500).send({ auth: false, message: 'Token no autorizado' });
    }

    if (!decoded.userId) {
      console.log('No userId in decoded token');
      return res.status(500).send({ auth: false, message: 'userId no encontrado en el token' });
    }

    req.userId = decoded.userId;
    next();
  });
};
