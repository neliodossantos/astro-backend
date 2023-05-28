const { Category: CategoryModel} = require("../models/Category");
const { Product : ProductModel } = require("../models/Product");
const path = require("path");
const upload = require("../config/multer");
const { response } = require("express");
const productController = {
    index: async(req,res) => {
        const {categoria, sort , page , limit } = req.query;
        const query =  await ProductModel.find().populate('category');
        if(categoria){
            query.where({categoria});
        }
        if(sort){
            query.where({sort});
        }
        if(page && limit){
            const pageNumber = parseInt(page, 10);
            limitNumber = parseInt(limit, 10);
            const skip = (pageNumber - 1) * limitNumber;
            query.skip(skip).limit(limitNumber);
        }
        const response = await query.exec();
        if (!response) res.status(404).json({response , msg: "Erro ao trazer os dados"});
        res.status(200).json({response,msg:"Sucesso ao trazer o dados"});
    },
    create : async(req,res) => {
        try {
             const category = await CategoryModel.findById(req.body.category);
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