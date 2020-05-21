const express = require('express');

const app = express();

const bodyParser = require("body-parser");

//Importando a rota de categoriasController
const categoriesController = require("./categories/CategoriesController");

//Importando Articles 
const articlesController = require("./articles/ArticlesController");


//Carregando conexão
const connection = require('./database/database');


//IMPORTANTE OS ARQUIVOS DO MODEL 

const Article = require("./articles/Article");
const Category = require("./categories/Category");



//Carregando  view engine
app.set("view engine", 'ejs');

//Static
app.use(express.static('public'));

//Configurando o body-parser para formulários
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Conectando ao banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso");
    })
    .catch((error) => {
        console.log("Erro na conexão")
    })


//Utlizando os rotas que estão dentro do categoriesController
app.use("/",categoriesController);
//Utilizando as rotas que estão dentro do articles 
app.use("/", articlesController);

// Rota que vai exibir os artigos
app.get("/:slug", (req, res) => {
    let slug = req.params.slug;

    // procurar pelo artigo que tem o slug igual doque o usuário colocou

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        // Vamos verificar se o artigo é diferente de undefined
        if (article != undefined) {

            //MENU DINÂMICO DE CATEGORIAS
              //PESQUISAR TODAS CATEGORIAS 
               // PASSANDO LISTAGEM DE CATEGORIAS 
            Category.findAll().then(categories => {
                res.render("article",{article: article, categories: categories});   
            })
        }
        else {
            res.redirect("/");
        }
    }).catch(erro => {
        res.redirect("/");
    })

})


//Criando rota principal
app.get("/", (req, res) => {
   // Vou fazer um select na table de articles 
      //COMANDO ORDER É PARA ORDER PELO ID, o post novo sempre vai ser o primeiro 
            //PESQUISANDO OS ARTIGOS E ENVIANDO PARA O FRONT-E
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
         //MENU DINÂMICO DE CATEGORIAS
              //PESQUISAR TODAS CATEGORIAS 
               // PASSANDO LISTAGEM DE CATEGORIAS 
        Category.findAll().then(categories => {
            res.render("index",{articles: articles, categories: categories});   
      })

          
   })
  
})
app.listen(3009, () => {
    console.log("Servidor rodando com sucesso");
})