//  const { Pedido : PedidoModel} = require('../models/Pedido');
//  const { Cart : CartModel } = require('../models/Cart');

//  const pedidoController = {
//     index: async (req, res) => {

//     },
//     create : async (req, res) => {
//         try{
//         // const objCart = [
//         // {
//         //     idMesa : "646deb71d3e134be93ff4a99",
//         //     productId : "646deb935467975450df7111",
//         //     quantity : 1
//         // },
//         // {
//         //     idMesa : "646deb71d3e134be93ff4a99",
//         //     productId : "646deb325a4f2614544ebd12",
//         //     quantity : 2
//         // }
//         // ];
//         // const idMesa = "646deb71d3e134be93ff4a99";
//         // const data = {
//         //     idMesa : idMesa,
//         //     items : objCart,
//         //     total : 1234
//         // }
//         const response = await PedidoModel.create(data);
//         res.status(201).json({response,msg:"Pedido criado com sucesso!"});

//         } catch(e) {
//             console.log(e);
//         }
//     }
// }

// module.exports = pedidoController;


