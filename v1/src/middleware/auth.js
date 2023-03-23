const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'C:\\Users\\msn-j\\Starti\\v1\\.env'});

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).json({ error: 'Erro no token' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }
  

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    if (decoded.userType !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado. Apenas administradores têm permissão para essa ação.' });
    }

    req.userId = decoded.id;

    return next();
  });
};
