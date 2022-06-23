const express=require('express');
const cors=require('cors');
const { dbConnection } = require('../database/config');
const socketUsers = require('./socketUsers');
const { ClientRequest } = require('http');



class Server{
    constructor(){
        this.app=express();
        this.port=3000;

        this.server = require('http').Server(this.app);
        this.io = require("socket.io")(this.server, {
            cors: {
              origin: "*",
              methods: ["GET", "POST"]
            }
          });;
        this.connectDB();

        this.listenSockets();

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

    listenSockets(){
        const connectedUsers= new socketUsers();
        this.io.on('connection',client=>{
            const handshake=client.id;
            //let {nameRoom}=client.handshake.query;
            //console.log(client.handshake);
            client.join('SALA X');
            console.log('Cliente conectado: '+handshake);
            
            client.on('event',(data)=>{
                //console.log(data);
                client.to('SALA X').emit('event',data);
            });

            client.on('selectedPiece',(data)=>{
                //console.log(data);
                client.to('SALA X').emit('selectedPiece',data);
            });

            client.on('start',()=>{
                console.log('startGame for everyone');
                client.to('SALA X').emit('start');
            })
            
            client.on('end',(data)=>{
                console.log('FIN');
                client.to('SALA X').emit('end',data)
            })
            
            client.on('configurar-usuario',(data)=>{
                
                connectedUsers.addUser(data.name);
                console.log(connectedUsers.users)
                client.emit('usuarios-activos',connectedUsers.users)
                client.on('disconnect',()=>{
                
                    console.log('Cliente desconectado');
                    connectedUsers.deleteUser(data.name)
                    client.emit('usuarios-activos',connectedUsers.users)
                    console.log(connectedUsers.users)
                    
                });
            })
        });      
    }



    routes(){
        this.app.use(require('../routes/puzzle'));
        this.app.use(require('../routes/user'));
    }

    start(){
        this.server.listen(process.env.PORT || 3000,()=>{
            console.log(`Server on port ${this.port}`);
        });
    }
}

module.exports=Server;