// Aqui vamos definir as rotas de artigos do nosso sstema

//Vamos criar rotas com a biblioteca express-routers

const express = require('express');
const router = express.Router();
//Model de catgoria
const Category = require ('../categories/Category');
const Article = require ('./Article');
const slugify = require ("slugify");

// Aqui vamos definir os rotas  

router.get('/admin/articles', (req, res) => {

         // Buscando todos os artigos no banco de daods
    Article.findAll({
        // INCLUINDO NA BUSCA O MODEL CATEGORY
        include: [{model: Category}]
    }).then(articles => {
         // Aqui vamos listar no front end todas as listas 
        res.render("admin/articles/index",{articles: articles});
    })
});

// Aqui vou criar o formulário
router.get('/admin/articles/new', (req, res) => {
    //Pesquisando todas as categorias
        //exibir listagen de categoria no formulário do new.ejs para o usuário selecionar qual categoria esse post vai fazer parte 
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories});
    })
});

//SALVANDO OS ARTIGOS 
router.post('/articles/save', (req, res) => {
    //TIMEZONE É DATA E HORA DO BD 


    //Pegando os dados do articles new.ejs 
    var title = req.body.title;
    var body = req.body.body;
    //Quando o id da categoria que ele marcou no select html
    var category = req.body.category;

    //Salvando o artigo 
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        //chama estrangeira 
      categoryId: category 
    }).then(() => {
        res.redirect("/admin/articles")
    })
}) 


/* ROTA PARA DELETAR CATEGORIA NO BD */
    router.post('/articles/delete', (req, res) => {
    
        let id = req.body.id;
        if(id != undefined){
            if(!isNaN(id)){
                    // Aqui vamos deletar com determinado title
                Article.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.redirect("/admin/articles");
                })
            }
            else{
                res.redirect('/admin/articles')
            }
        
        }
        else{
            res.redirect('/admin/articles')
        }
        

    })



module.exports = router;
 
 
 
