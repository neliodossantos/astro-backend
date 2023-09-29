const db = require('../conn.js');
const mongoose = require('mongoose');
const { Category: CategoryModel } =  require('../../models/Category');
const { SubCategory: SubCategoryModel } =  require('../../models/SubCategory');

const {User : UserModel} = require('../../models/User');

const seedDatabase = async () => {   
    try {
        const contextCategory = await CategoryModel.find().count();
        const contextSubCategory = await SubCategoryModel.find().count();
        const contextUser = await UserModel.find().count();
        if(!contextCategory) {
            const categorias =  [
                { nome : 'Bebidas' },
                { nome : 'Fast Food'}
            ];
            await CategoryModel.create(categorias);
        }

        if(!contextSubCategory) {
            const subcategorias =  [
                { 
                    nome : 'Bebidas',
                    category : '651651174c483691604e3c6d'
                }
                
            ];
            await SubCategoryModel.create(subcategorias);
        }
        if(!contextUser){
            const users = [
                {
                    nome : 'admin',
                    email : 'neliodossantos@gmail.com',
                    senha : 'ola',
                    nif : 1234567891011,
                    telefone : 123456789
                },
                {
                    nome : 'Restaurant Sapu',
                    email : 'aaaaaaaaa@gmail.com',
                    senha : 'olalll',
                    nif : 1234567891011,
                    telefone : 123456789
                }
            ];
            await UserModel.create(users);
    }
}
     catch (error) {
        console.log(error);
    }
}
module.exports = seedDatabase;