const mongoose = require('mongoose');


const dbConnection = async() =>{
    try {
        /*await mongoose.connect( process.env.MONGODB_CON, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })*/
        await mongoose.connect( process.env.MONGODB_CON );

        console.log('Base de datos conectada!!');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }
}

module.exports = {
    dbConnection
}