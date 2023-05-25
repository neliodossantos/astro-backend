const mongoose = require('mongoose');

async function main()
{
    const url = 'mongodb://localhost:27017/astro';
    const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
    };

    mongoose.set("strictQuery",true);
    
    try{
        await mongoose.
        connect(url,options);
        console.log("Conexao feita com Sucesso");
    } catch(err){
        console.log('Erro:'+err);
    }
}
module.exports = main;