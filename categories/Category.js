// Aqui vai ser o model da categoria

const Sequelize = require("sequelize");

//Importar o script de conexão com banco de dados
const connection = require("../database/database");

// Criando tabela category  no banco
const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true
        //SLUG É VERSÃO DO TITULO DA CATEGORIA PARA ROTA 
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

//SINCRONIZANDO PARA CRIAR O RELACIONAMENTO
Category.sync({force: true})




module.exports = Category;