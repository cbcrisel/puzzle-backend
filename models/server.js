const express=require('express');
const cors=require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app=express();
        this.port=3000;

        this.connectDB();

        this.middlewares();
        this.routes();
    }
    
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use('/public',express.static('public'));
    }

    async connectDB(){
        await dbConnection();
    }

    routes(){
        this.app.use(require('../routes/puzzle'));
    }

    start(){
        this.app.listen(process.env.PORT || 5000,()=>{
            console.log(`Server on port ${this.port}`);
        });
    }
}

module.exports=Server;