const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/usuarios';

        //Conectar base de datos
        this.DBConnect();

        //Middlewares
        this.middlewares();
        //app routes
        this.routes();
    }

    async DBConnect(){
        await dbConnection();
    }

    middlewares() {
        //Public directory
        this.app.use(express.static('public'));

        //Lectura y parseo del body
        this.app.use( express.json() );

        //cors
        this.app.use(cors());

    }

    routes() {

        this.app.use(this.usersPath, require('../routes/user.routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}


module.exports = Server;