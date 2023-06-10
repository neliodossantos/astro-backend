const { SubCategory: SubCategoryModel, SubCategory } =  require('../models/SubCategory');

const SubCategoryController = {
    create : async(req,res) => {
        try {
            const nome = req.body;
            const findCategory = await SubCategoryModel.findOne(nome);
            if(findCategory){
                return res.status(400).json({msg:"SubCategoria já existe"});
            }
            const response = await SubCategoryModel.create(req.body);
            res.status(201).json({response,msg:"SubCategoria criada com sucesso!"});
        } catch (error){
            console.log(error);
        }
    },
    index : async (req,res) =>
    {
        try {
            const service = await SubCategoryModel.find().populate('category');
            res.json(service);
        } catch (error) {
            console.log("erro:"+error);
        }
    },
    get : async (req,res) => {
        try{
            const id = req.params.id;
            const getId = SubCategoryModel.findById(id);
            if(!getId){
                res.status(404).json({msg:"Serviço não encontrado"});
            }
            const response = SubCategoryModel.findOne(id);
            res.status(201).json({response,msg:"Encontrado com Sucesso"});
        } catch(erro){
            console.log("erro:"+erro);
        }
    },
    delete : async (req,res) =>{
        const deleteCategory = await SubCategoryModel.findByIdAndDelete(req.params.id);
        if(!deleteCategory){
            res.status(404).send("A categoria não pode ser apagada");
        }
        res.send("Categoria Apagada com Sucesso");
        const id = req.params.id;
        try {
           const getId = await SubCategoryModel.findById(id);
            if(!getId){
                res.status(404).json({msg:"Serviço não encontrado"});
                return;
            }
            const response = await SubCategoryModel.findByIdAndDelete(id);
            res.status(201).json({response,msg:"Categoria eliminada com sucesso!"});
        } catch (error) {
            console.log("erro:"+error);
        }
    },
    update : async (req,res) =>{
        const id = req.params.id;
        const { nome , owner } = req.body;
        const updateCategory = await SubCategoryModel.findByIdAndUpdate(req.params.id,
        {
            nome:nome,
            owner:owner
        });
        if(!updateCategory){
            res.status(404).send("A Subcategoria não pode ser actualizada!");
        }
        res.send("Subcategoria actualizada com sucesso");
    },
    getRestarantSubcategory : async (req,res) => {
        try
        {
            const restaurantId = req.params;
            const response = await SubCategoryModel.find({owner:restaurantId});
            res.status(201).json({response});
        } catch (err){
            console.log(err);
            res.status(404).json({msg:"Erro ao trazer os dados"});
        }

    }
};
module.exports = SubCategoryController;

