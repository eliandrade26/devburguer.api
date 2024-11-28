/** @type  {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false, // não permite que o campo seja nulo
        type: Sequelize.UUID, // cadeia de caracteres que torna unico
        defaultValue:Sequelize.UUIDV4, // UUIDV4 seria a versão da cadeia de caracteres
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      email:{
        type:Sequelize.STRING,
        allowNull:false, 
        unique:true, // verifica se o email ja esta em uso e não permite a repetição
      },
      password_hash:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      admin:{
        type:Sequelize.BOOLEAN, // permite dois tipos de valores VERDADEIRO OU FALSO
            defaultValue:false, // torna a opção de admin falso automaticamente
      },
      created_at:{
        type:Sequelize.DATE, //informações de atoria
        allowNull:false,
      },
      updated_at:{
        type:Sequelize.DATE, //informações de autoria
        allowNull:false,

      },
      
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
     
  }
};
