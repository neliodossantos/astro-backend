const { User : UserModel} = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const authController = {
    register: async (req,res) => {
      try {
            const {nome,email,senha, role} = req.body;
            const searchNome = await UserModel.findOne({ nome});
            const searchEmail = await UserModel.findOne({ email });
            
            if (searchEmail || searchNome) {
            return res.status(400).json({ error: 'Usuário já existe' });
            }     
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(senha, salt);
            const user = new UserModel({
                nome,
                email,
                senha: hashedPassword,
                role
              });
           await user.save();
           res.status(201).json({msg:"Usuario registradado com sucesso",user});
      } catch (error) { 
        res.status(500).json({msg:"Erro ao registrar o usuario",error});
      }
    },
    login : async (req,res) => {
        try {
            const { email, senha } = req.body;
        
            const user = await UserModel.findOne({ email });
            if (!user) {
              return res.status(401).json({ error: 'Usuário ou senha inválidos' });
            }
    
            const passwordMatch = await bcrypt.compare(senha, user.senha);
            if (!passwordMatch) {
              return res.status(401).json({ error: 'Usuário ou senha inválidos' });
            }
            const playload = {
              userId: user._id, 
              nome: user.nome,
              email: user.email,
              role: user.role 
            }
            const token = jwt.sign(playload,authConfig.secret,{
              expiresIn: "1h",});
            res.json({msg:"Usuario logado com Sucesso.", token });
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao fazer login' });
          }
    }
}
module.exports = authController;