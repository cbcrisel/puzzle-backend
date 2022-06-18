const {response,request} = require('express');
const User=require('../models/user');
const bcryptjs=require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const postUser = async(req=request,res=response) => {
    const {name,email,password,role}= req.body;
    const user = new User({name,email,password,role});
    //Encriptar en BD
    const salt = bcrypt.genSaltSync();
    user.password=bcrypt.hashSync(password,salt);
   //Guardar en BD
    await user.save();    
    res.json({
       msg:'post api',
       user
    });
}

const login = async(req=request,res=response) => {
    const {email,password}=req.body;
    try {
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:'El usuario no es correcto'
            });
        }
        const validPassword = bcryptjs.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Contraseña incorrecta'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
         })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Server Error'
        })
    }
}


module.exports={
   login,postUser
}