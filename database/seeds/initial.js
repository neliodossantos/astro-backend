const db = require('../conn.js');
const mongoose = require('mongoose');
const { Category: CategoryModel } =  require('../../models/Category');
const {Mesa: MesaModel} = require('../../models/Mesa.js')
const seedDatabase = async () => {   
    try {
        const contextCategory = await CategoryModel.find().count();
        const contextMesa = await MesaModel.find().count();
        if(!contextCategory) {
            const categorias =  [
                { nome : 'Bebidas' },
                { nome : 'Fast Food'}
            ];
            await CategoryModel.create(categorias);
        }
        if(!contextMesa) {
            const mesas =  [
                { nome : 'Mesa1' },
                { nome : 'Mesa2'}
            ];
            await MesaModel.create(mesas);
        }
        // if(!contextUser){
        //     const users = [
        //         {
        //             nome : 'admin',
        //             email : 'neliodossantos@gmail.com',
        //             senha : 'ola',
        //             nif : 1234567891011,
        //             telefone : 123456789
        //         },
        //         {
        //             nome : 'Restaurant Sapu',
        //             email : 'aaaaaaaaa@gmail.com',
        //             senha : 'olalll',
        //             nif : 1234567891011,
        //             telefone : 123456789
        //         }
        //     ];
        //     await UserModel.create(users);
    } catch (error) {
        console.log(error);
    }
}
module.exports = seedDatabase;