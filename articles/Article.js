
const Sequelize = require("sequelize");
const connection = require("../database/database");

//criando o relacionamento, meu model article quer se relacionar com model category
const Category = require('../categories/Category');




const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        AllowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: { //Conteudo do arquivo
        type: Sequelize.TEXT,
        allowNull: false
    }
})


//EXPRESSAR O RELACIONAMENTO 


    //RELACIONAMENTO 1 PARA N 
 Category.hasMany(Article); // UMA CATEGORIA TEM MUITOS ARTICLES 


    //RELACIONAMENTO 1 PARA 1 
Article.belongsTo(Category); //UM ARTICLE PERTENCE A UMA CATEGORIA 


//SEMPRE QUE CRIAMOS UM RELACIONAMENTO TEMOS QUE ATUALIZAR O BANCO DE DADOS
   //SINCRONIZANDO OS MODELS COM A TAB NO BD
  // Article.sync({force: true}) //criando tabela sempre que recarregar o programa
   
   

module.exports = Article;