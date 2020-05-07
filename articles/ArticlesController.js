// Aqui vamos definir as rotas de artigos do nosso sstema

//Vamos criar rotas com a biblioteca express-routers

const express = require('express');
const router = express.Router();
//Model de catgoria
const Category = require ('../categories/Category');

// Aqui vamos definir os rotas 

router.get('/articles', (req, res) => {
    res.send("Rota de Artigos");
});

// Aqui vou criar o formulário
router.get('/admin/articles/new', (req, res) => {
    //Pesquisando todas as categorias
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories});
    })
});

module.exports = router;