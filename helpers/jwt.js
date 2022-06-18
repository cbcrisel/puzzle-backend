const { request, response } = require('express');
const jwt = require('jsonwebtoken');


const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

const validateJWT=async(req= request, res=response,next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const {uid} = await jwt.verify(token, process.env.SECRETPRIVATEKEY);
        req.id=uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}


module.exports = {
    generateJWT,
    validateJWT
}