// Aqui vamos definir as rotas de categoria do nosso sstema

//Vamos criar rotas com a biblioteca express-routers

const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');

//Definir rota de achar o formulário para criar uma nova categoria

router.get('/admin/categories/new',(req, res) => { // Rota para admin 
    res.render("admin/categories/new");
    //EXIBIR FORMULÁRIO DE CRIAÇÃO DE CATEGORIA
})

//CADASTRANDO A CATEGORIA NO CATEGORIES CONTROLLER 
router.post('/categories/save', (req, res) => {
    // RECEBENDO OS DADOS DO FORMULÁRIO
    let title = req.body.title;


    //Verificar se o titulo é valido
    if(title != undefined) {
        //Salvando a categoria no banco
        Category.create({
            title: title,
            //slugin é a versão do titulo sem espaço "Desenvolvimento Web" => "desenvolvimento-web"
            slug: slugify(title)
        }).then(() => {
            res.redirect("/")
        })
    }else{
        res.redirect("/admin/categories/new")
    }
})




// Aqui vou criar uma rota para tabelas
router.get('/admin/categories',(req, res) => { // Rota para admin 

    //Faz o select no banco de dados
    Category.findAll().then(categories =>{

        res.render("admin/categories/index", {categories: categories}); // O JSON VAI PASSAR O JSON PARA FRONT-END

    })
})

module.exports = router;
//PARA USAR O SLUG TENHO QUE BAIXAR A BIBLIOTECA SLUGIFY, transforma um texto normal em um slug 
