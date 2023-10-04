const { SubCategory: SubCategoryModel, SubCategory } =  require('../models/SubCategory');
const { Category: CategoryModel, Category } =  require('../models/Category');
const { Product : ProductModel } = require("../models/Product");
const productController = {
    index: async(req,res) => {
        try {
            const products = await ProductModel.find();
            res.status(201).json(products);
          } catch (err) {
            res.status(500).json({ message: 'Erro ao buscar os produtos.' });
          }

    },
    create : async(req,res) => {
        try {
             const {nome, descricao,preco, category,subcategory} = req.body;
             const getCategory = await CategoryModel.findById(req.body.category);
             const getSubcategory = await SubCategoryModel.findById(req.body.subcategory);
             const images = req.files.map((file) => file.filename);
             console.log(images);
            // Salve as informações dos arquivos no banco de dados, se desejar
            console.log(getCategory);
            const response = await ProductModel.create({
                nome,
                descricao,
                preco,
                category,
                subcategory,
                images: images
            });
            res.status(201).json({response,msg:"Produto criado com sucesso!"});
        } catch (error){
            console.log(error);
        }
    },

    get: async (req,res) => {
        const subcategoryId = req.params.id; // Pega o valor do parâmetro 'id' da URL
        console.log(subcategoryId);
        const result = await ProductModel.find({ subcategory: subcategoryId });
        if(!result){
            res.status(404).json({msg: 'Subcategoria não encontrado'});
            return;
        }
        res.status(200).json(result);
    },
    delete : async(req,res) => {
        const id = req.params.id;
        const getId = ProductModel.findById({_id:id});
        if(getId !== null){
            const dados = await ProductModel.findByIdAndDelete({ _id: id });
            //console.log(dados);
            res.status(200).send("Sucesso ao apagar o dado");
        }else{
            res.status(404).send("Erro : Ao encontrar o ID");
        }
    },
    update : async(req,res) => {
        const id = req.params.id;
        const {nome, descricao,preco, category,subcategory} = req.body;
        const getId = ProductModel.findById({_id:id});
        const images = req.files.map((file) => file.filename);
        if(getId !== null){
            const response = await ProductModel.findByIdAndUpdate({_id:id},{
                nome,
                descricao,
                preco,
                category,
                subcategory,
                images: images
            });
            res.status(201).json({msg:"Produto actualizado com sucesso!"});
        }else{
            res.status(404).send("Erro : Ao encontrar o ID");
        }
    }


}
module.exports = productController;