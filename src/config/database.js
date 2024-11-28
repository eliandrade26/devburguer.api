module.exports = {
    dialect:'postgres',
    host:'localhost',
    username:'postgres',
    password:'postgres',
    database:'devburguer',
    port: 5432,
    define:{
        timestamps: true, // registra horarios de modificação
        underscored: true, // deixa todas as letras em snakecase - caixa baixa e separadas por _
        underscoredAll: true,
    },
};

