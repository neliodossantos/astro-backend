const { Mesa: MesaModel } =  require('../models/Mesa');
const moment = require("moment");

const mesaController = {
    create : async(req,res) => {
        const {nome , owner} = req.body;
        try {
            const response = await MesaModel.create({
                nome : nome,
                owner : owner
            });
            res.status(201).json({response,msg:"Mesa criada com sucesso!"});
        } catch (error){
            console.log(error);
        }
    },
    index : async (req,res) =>
    {
        try {
            const service = await MesaModel.find();
            res.json(service);
        } catch (error) {
            console.log("erro:"+error);
        }
    },
    get : async (req,res) => {
        try{
            const id = req.params.id;
            const getId = MesaModel.findById(id);

            if(!getId){
                res.status(404).json({msg:"Serviço não encontrado"});
            }

            const response = MesaModel.findOne(id);
            res.status(201).json({response,msg:"Encontrado com Sucesso"});


        } catch(erro){
            console.log("erro:"+erro);
        }
    },
    delete : async (req,res) =>{
        const deleteCategory = await MesaModel.findByIdAndDelete(req.params.id);
        if(!deleteCategory){
            res.status(404).send("A categoria não pode ser apagada");
        }

        res.send("Categoria Apagada com Sucesso");
        // const id = req.params.id;
        // try {
        //     const getId = await CategoryModel.findById(id);
        //     if(!getId){
        //         res.status(404).json({msg:"Serviço não encontrado"});
        //         return;
        //     }
        //     const response = await CategoryModel.findByIdAndDelete(id);
        //     res.status(201).json({response,msg:"Categoria eliminada com sucesso!"});
        // } catch (error) {
        //     console.log("erro:"+error);
        // }
    },
    update : async (req,res) =>{
        //const id = req.params.id;
        const updateCategory = await MesaModel.findByIdAndUpdate(req.params.id,{
            nome:req.body.nome,
        });
        if(!updateCategory){
            res.status(404).send("A categoria não pode ser actualizada!");
        }
        res.send("Categoria actualizada com sucesso");
        // try {
        //     const getId = await CategoryModel.findById(id);

        //     if(!getId){
        //     res.status(404).json({msg: "Serviço não encontrado"});
        //     }

        //     const service = {
        //     nome : req.body.nome,
        //     }
        //     const updateService = CategoryModel.findByIdAndUpdate(id,service);

        //     if(!updateService){
        //         res.status(404).json({msg:"Erro ao actualizar"});
        //     }
        //     res.status(201).json({updateService,msg:"Actualizado com sucesso."});

        // } catch (error) {
        //     console.log("erro:"+error);
        // }
    }
};

module.exports = mesaController;

