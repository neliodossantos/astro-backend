const express = require('express');
const app = express();
const routes = require('./routes/router');


// Rota para acessar as imagens de upload
app.use('/uploads', express.static('uploads'));

// forma de ler json
app.use(express.urlencoded({extended:true,}),)
app.use(express.json());

// connection
const conn = require('./database/conn');
conn();

const seedDatabase = require('./database/seeds/initial');
seedDatabase();

app.use('/api',routes);
app.listen(3030);