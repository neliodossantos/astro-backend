const express = require('express');
const app = express();
const routes = require('./routes/router');
const cors = require('cors');
// forma de ler json
app.use(express.urlencoded({extended:true,}),)
app.use(express.json());
// connection
const conn = require('./database/conn');
conn();


// Configurar opções do CORS para permitir qualquer origem
const corsOptions = {
    origin: '*', // Permitir qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Se você está usando cookies ou autenticação
  };
  
  // Aplicar o middleware CORS com as opções configuradas
app.use(cors(corsOptions));

const seedDatabase = require('./database/seeds/initial');
seedDatabase();

app.use('/api',routes);
app.listen(3030);