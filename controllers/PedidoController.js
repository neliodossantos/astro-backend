const { Pedido : PedidoModel } = require("../models/Cart");
const { PedidoSchema } = require("../models/Pedido");

const PedidoController = {
    index: async (req, res ) =>{
        const data = await PedidoModel.find();
        if(!data){
            res.send("Falha ao trazer os dados");
        }
        res.status(201).json({msg:"Sucesso ao trazer os dados"},data);
    },
    create : async (req,res) => {
        try{
            const status = PedidoSchema.path('status').enumValues;
            const {mesaId,productId,quantity} = req.body;
            const data = {
                mesaId,
                productId,
                quantity,
                totalPrice,
                status : status[0]
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

module.exports = PedidoController;