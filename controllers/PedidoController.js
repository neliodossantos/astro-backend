const { Pedido : PedidoModel } = require("../models/Pedido");
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
            const findProduct = await PedidoModel.findById(productId);
            if(findProduct){
                const response = await PedidoModel.findByIdAndUpdate(mesaId,{quantity:quantity});
                res.json(response);
            }else{
                res.json({error:"Nao encontrou o produto"});
            }
        } catch (e) {
            console.log(error);
        }
    },
    fecharConta : async (req,res) =>{
        const idPedido = req.params.id;
        const getId = await PedidoModel.findById(idPedido);
        if(!getId){
            res.status(404).json({msg: 'Nao encontrou o ID'});
        }else{
            const response = await PedidoModel.findByIdAndUpdate(getId,{historico : true});
            res.send(response);
        }
    }
}

module.exports = PedidoController;