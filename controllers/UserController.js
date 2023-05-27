const bcrypt = require('bcrypt');
const {User: UserModel} = require('../models/User');

const User = {
    getUser: async (req, res) => {
        const id = req.params.id;
        const user = await UserModel.findById(id,'-senha');

        if(!user){
            res.status(404).json({msg: 'User not found',error});
            return;
        }
        res.status(200).json({user});
    },
    returnUserLogado : async (req, res) => {
        res.json(req.userData);
    },
    getUsers : async (req, res) => {
        try {
            const response = await UserModel.find();
            res.json({msg:"Sucesso na busca de todos os usuarios",response});
        } catch (error) {
            console.log(error);
            res.status(401).json({msg:"Erro ao buscar os dados"});
        }
    },
    updateProfile : async (req,res) =>  {
        try {
            const getId = User.findById(req.params.id);
            if(!getId) {
                res.status(404).json({msg:"Id não encontrados"});
            }            
            const { nome , email , senha} = req.body;
            const salt = await bycript.genSalt(12);
            const hashedPassword = await bcrypt.hash(senha, salt);
            const data = {
                nome: nome,
                email: email,
                senha: hashedPassword
            }
            const response = await UserModel.findByIdAndUpdate(getId,data);
        } catch (error) {
            console.log(error);
            res.json("Erro ao actualizado os dados");
        }
    }

}
module.exports = User;