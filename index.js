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





//Criando rota principal
app.get("/", (req, res) => {
    res.render("index");
})
app.listen(3009, () => {
    console.log("Servidor rodando com sucesso");
})