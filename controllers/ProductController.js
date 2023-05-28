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
            const {nome , descricao , preco ,categoryId , owner} = req.body;
            CategoryModel.findOne({ 'categoryId': categoryId }, (err, result) => {
                if (err) { console.log('Error at finding categoryId ::', err); res.send(err) }
                if (result) {
                    const { path } = req.file;
                     const newProduct = new ProductModel({
                        nome: nome,
                        descricao : descricao,
                        preco: preco,
                        category : mongoose.Types.ObjectId(result.categoryId),
                        image : path,
                        owner : owner,
                    });
                    newProduct.save((err,result) => {
                        if (err) { console.log('Error at saving new blog ::', err); res.send(err) }
                        else{
                            console.log('Successfully saved new blog'); res.send(result)
                        }
                    })
                    res.status(201).json({response,msg:"Produto criado com sucesso!"});
                } else {
                    console.log('No category found for ::', req.body.category)
                    res.send('No category found')
                }
            })
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