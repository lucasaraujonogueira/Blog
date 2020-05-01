// Aqui vamos definir as rotas de artigos do nosso sstema

//Vamos criar rotas com a biblioteca express-routers

const express = require('express');
const router = express.Router();

// Aqui vamos definir os rotas 

router.get('/articles', (req, res) => {
    res.send("Rota de Artigos");
});

module.exports = router;