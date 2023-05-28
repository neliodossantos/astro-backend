const { Category } = require("../models/Category");
const { Product : ProductModel } = require("../models/Product");
const mongoose = require("mongoose");
const path = require("path");
const upload = require("../config/multer");
const { response } = require("express");
const productController = {
    index: async(req,res) => {
        const response = await ProductModel.find().populate('category');
        if (!response) res.status(404).json({response , msg: "Erro ao trazer os dados"});
        res.status(200).json({response,msg:"Sucesso ao trazer o dados"});
    },
    create : async(req,res) => {
        try {
            const {nome , descricao , preco ,categoryId ,userId} = req.body;
             const findCategoryId =await Category.findById(categoryId);
             if(!findCategoryId) res.status(404).send("Erro nao encontrou a categoria");
             const { path } = req.file;
             const response = await ProductModel.create({
                nome: nome,
                descricao : descricao,
                preco: preco,
                category : mongoose.Types.ObjectId(result.categoryId),
                image : path,
                userId : userId,
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