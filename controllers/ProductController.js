const { Category : CategoryModel } = require("../models/Category");
const { Product : ProductModel } = require("../models/Product");
const path = require("path");
const upload = require("../config/multer");
const productController = {
    index: async(req,res) => {
        try{
        const { category, sortBy, sortOrder, page, limit } = req.query;
        const filter = category ? { category: category } : {};
        const sortOptions = {};
        if (sortBy && sortOrder) {
          sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }
        // Pagination
        const skip = (page - 1) * limit;
        const totalProducts = await ProductModel.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);
    
        const products = await ProductModel.find(filter)
          .sort(sortOptions)
          .skip(skip)
          .limit(limit)
          .populate('category');
        res.json({ products, totalPages });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
    create : async(req,res) => {
        try {
             const category = await Category.findById(req.body.category);
             if(!category) res.status(404).send("Erro nao encontrou a categoria");
             const { path } = req.file;
             const response = await ProductModel.create({
                nome: req.body.nome,
                descricao : req.body.descricao,
                preco: req.body.preco,
                category : req.body.category,
                image : path,
                userId : req.body.idUser,
            });
            res.status(201).json({response,msg:"Produto criado com sucesso!"});
        } catch (error){
            console.log(error);
        }
    },
    update : async (req,res)=> {
        const getId = await ProductModel.findById(req.params.id)
        if(!getId) res.status(404).send("Não encontrou o ID");
        const updateProduct = await ProductModel.findByIdAndUpdate(id,{
                nome: req.body.nome,
                descricao : req.body.descricao,
                preco: req.body.preco,
                category : req.body.category,
                image : req.file.path
        });
        if(!updateCategory) res.status(404).send("erro: Ao Actualizar o dado");
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