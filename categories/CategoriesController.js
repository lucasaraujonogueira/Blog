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
                res.redirect("/admin/categories")
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

    /* ROTA PARA DELETAR CATEGORIA NO BD */
    router.post('/categories/delete', (req, res) => {
    // Como eu não tenho id , vou pegar pelo titulo
        let id = req.body.id;
        if(id != undefined){
            if(!isNaN(id)){
                    // Aqui vamos deletar com determinado title
                Category.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.redirect("/admin/categories");
                })
            }
            else{
                res.redirect('/admin/categories')
            }
        
        }
        else{
            res.redirect('/admin/categories')
        }
        

    })

// Rota da categoria em que eu quero editar, nos vamos editar por id 
    router.get('/admin/categories/edit/:id', (req, res) => {
        let id = req.params.id;


        // Verificando se o id não é um numero
        if(isNaN(id)){
            res.redirect('/admin/categories')
        }


        // Pesquisar categoria pelo id = findPk()
        Category.findByPk(id).then((category) => {
            // Verificar se a categoria é nulla
            if(category != undefined){
                // Passando a categoria para view edit, passando os dados da categoria 
                res.render("admin/categories/edit", {category: category});
            }
            else{
                // Categoria é nulla
                res.redirect('/admin/categories')
            }
        }).catch(erro => {
            res.redirect('/admin/categories')
        })
    })

    router.post('/categories/update', (req, res) => {
        //Utilizando a category precisamos do id e titulo da categoria
        let id = req.body.id; // Estou colocando body pois estou recebendo via formulário
        let title = req.body.title; // Titulo atualizado

        // PaRA ATUALIZAR COM SEQUELIZE 
        Category.update({title: title, slug: slugify(title)}, {
            // Qual categoria queremos atualizar 
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/categories');
        })

    })



module.exports = router;
//PARA USAR O SLUG TENHO QUE BAIXAR A BIBLIOTECA SLUGIFY, transforma um texto normal em um slug 
