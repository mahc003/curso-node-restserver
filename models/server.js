const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //conectar a base de datos
        this.conectarDB();

        //Middleware
        this.middlewares();

        //rutas de aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        this.app.use(cors());

        //Lestura y parseo del body
        this.app.use( express.json() );//permite que se envien al server objetos json

        //servir la carpeta publica
        this.app.use( express.static('public') );

    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor funcionando en puerto', this.port)
        })
    }
}

module.exports = Server;