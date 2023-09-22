const express = require('express');
var cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios'

        //Middleware
        this.middlewares();

        //rutas de aplicacion
        this.routes();
    }

    middlewares(){

        this.app.use(cors());

        //Paerso y lectura del body
        this.app.use( express.json() );

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
