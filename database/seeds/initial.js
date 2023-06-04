const db = require('../conn.js');
const mongoose = require('mongoose');
const { Category: CategoryModel } =  require('../../models/Category');
const {Mesa: MesaModel} = require('../../models/Mesa.js');
const {User: UserModel} = require('../../models/User.js');


const seedDatabase = async () => {   
    try {
        const contextCategory = await CategoryModel.find().count();
        const contextMesa = await MesaModel.find().count();
        const contextUser = await UserModel.find().count();
        
        if(!contextCategory) {
            const categorias =  [
                { nome : 'Bebidas' },
                { nome : 'Comida'}
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
        if(!contextUser){
            const users = [
                {
                    nome : 'admin',
                    email : 'neliodossantos@gmail.com',
                    senha : '12345678',
                    telefone : 123456789
                },
                {
                    nome : 'Restaurant Sapu',
                    email : 'restaurant@gmail.com',
                    senha : '12345678',
                    nif : 1234567891011,
                    telefone : 123456789
                }
            ];
            await UserModel.create(users);
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = seedDatabase;