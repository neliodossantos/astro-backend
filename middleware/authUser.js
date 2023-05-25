const auth = require('../config/auth');
const jwt = require('jsonwebtoken');
const authUser = (req,res,next) =>{
    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      // console.log(token);
      const decoded = jwt.verify(token, auth.secret);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Falha na Autenticação!' });
    }
  };


module.exports = authUser;