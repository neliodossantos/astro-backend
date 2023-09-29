const { Category } = require("../models/Category");
const { Product : ProductModel } = require("../models/Product");
const upload = require("../config/multer");
const productController = {
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
             const {nome, descricao,preco, category,subcategory,userId,numPeca,carros} = req.body;
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
                userId,
                 numPeca,
                 carros
            });
            res.status(201).json({response,msg:"Produto criado com sucesso!"});
        } catch (error){
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