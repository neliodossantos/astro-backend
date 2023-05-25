const auth = require('../config/auth');
const jwt = require('jsonwebtoken');

const verificarAdminMiddleware = (req, res, next) => {

    // Middleware para verificar se o usuário possui a regra de administrador
      // Obtenha o token do cabeçalho da solicitação
      const token = req.headers.authorization.replace('Bearer ', '');
      // ==> um console para termos uma saída do 'token'
      const decoded = jwt.verify(token, auth.secret);
      req.userData = decoded;

      // Verifique se o token está presente
      if (!token) {
        return res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
      }
    
      try {
        // Verifique e decodifique o token
    
        // Verifique se o usuário possui a regra de administrador
        if (req.userData.role !== 'admin') {
          return res.status(403).json({ mensagem: 'Acesso negado. Somente administradores podem registrar usuários.' });
        }
        // Se o usuário for um administrador, chame o próximo middleware ou a rota de registro de usuários
        next();
      } catch (err) {
        return res.status(401).json({ mensagem: 'Token de autenticação inválido.' });
      }
  };
  
module.exports = verificarAdminMiddleware;