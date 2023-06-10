const { Pedido : PedidoModel} = require('../models/Pedido');

const HistoricoController = {
    index : async(req,res) => {
        try {
            const response = await PedidoModel.find({historico: true});
            res.send(response);
        } catch (error) {
            console.log(error);
            res.send({msg:"Erro ao trazer os dados"},error);
        }
    }
}