const express = require('express');
const router = express.Router();

const rotas = require('./services');

router.use("/",rotas);
module.exports = router;