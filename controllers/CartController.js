const { Cart : CartModel } = require("../models/Cart");

const CartController = {
    index: async (req, res ) =>{
        const mesaId = req.params.mesaId;
        const getmesaId = await CartModel.findById(mesaId);
        const data = await CartModel.find({getmesaId});
        if(!data){
            res.send("Falha ao trazer os dados");
        }
        res.status(201).json({msg:"Sucesso ao trazer os dados"},data);
    },
    create : async (req,res) => {
        try{
        const {mesaId,productId,quantity} = req.body;
        const data = {
            mesaId,
            productId,
            quantity
        }
        const response = await CartModel.create(data);
        res.status(201).json(response);
        } catch (error) {
            console.log(error);
        }
    },
    update : async (req,res) => {
        try{
            const {mesaId,productId,quantity}  = req.body;
            const update_cart = await CartModel.findOneAndUpdate({mesaId, productId},{quantity:quantity});
        } catch (e) {
            console.log(error);
        }
    }
}

module.exports = CartController;