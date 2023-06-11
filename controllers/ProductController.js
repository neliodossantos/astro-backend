const { Category } = require("../models/Category");
const { Product : ProductModel } = require("../models/Product");
const { Mesa : MesaModel } = require("../models/Mesa");
const upload = require("../config/multer");
const productController = {
//     pegarProdutos : async(req,res) => {
//        const onwer = req.params.onwer;
//        const getMesa = await MesaModel.findById(req.params.mesaId);
//        const mesaName = getMesa.nome;
//        await MesaModel.findById(req.params.mesaId).then(async() =>{
//        const response = await ProductModel.find({owner: onwer});
//        if (!response) res.status(404).json({msg: "Erro ao trazer os dados"});
//        res.status(200).json({response,mesaName,msg:"Sucesso ao trazer o dados"});
//        }).catch(()=>{
//            res.send({msg:"Erro nao encontrou id"});
//        });
//    },
    index: async(req,res) => {
        try {
            const userId = req.params.idUser;
            const products = await ProductModel.find({userId});
            res.json(products);
          } catch (err) {
            res.status(500).json({ message: 'Erro ao buscar os produtos do usuário.' });
          }

    },
    create : async(req,res) => {
        try {
             const {nome, descricao,preco, category,subcategory,userId} = req.body;
             const getCategory = await Category.findById(req.body.category);
             if(!getCategory) res.status(404).send("Erro nao encontrou a categoria");
             const { path } = req.file;
             const response = await ProductModel.create({
                nome,
                descricao,
                preco,
                category,
                subcategory,
                image: path,
                userId
            });
            res.status(201).json({response,msg:"Produto criado com sucesso!"});
        } catch (error){
            console.log(error);
        }
    },
    update : async (req,res)=> {
        try {
            const { nome, descricao , preco , category , subcategory , userId } = req.body;
            const image = req.file ? req.file : undefined;
            const product = await ProductModel.findByIdAndUpdate(req.params.id, {
                nome,
                descricao,
                preco,
                category,
                subcategory,
                image,
                owner
            }, { new: true });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao actualizar' });
            console.log(error);
        }
    },
    delete : async(req,res) => {
        const getId = ProductModel.findById(req.params.id);
        if(!getId) res.status(404).send("Erro : Ao encontrar o ID");
        const response = ProductModel.findByIdAndDelete(getId);
        if(!response) res.status(404).send("Erro ao Apagar o dado");
        res.status(200).send("Sucesso ao apagar o dado");
    }
}
module.exports = productController;