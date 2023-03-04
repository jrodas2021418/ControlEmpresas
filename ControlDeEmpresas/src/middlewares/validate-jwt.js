const { request, response} = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Enterprise = require("../models/enterprise.model");

const validateJWT = async(req = request, res =response, next) =>{
    const token = req.header("x-token");

    if(!token){
        return res.status(400).send({
            msg:' No hay token en la peticion',
        });

    }
}
try {
    const payload = jwt.decode(token, process.env.SECRET_KEY);
    const enterpriseFind = await Enterprise.findById(payload.uId);


    if(payload.exp <= moment().unix()){
      return res.status(500).send({msg:"el token ha expirado"});
    }

    if(!enterpriseFind){
        return res.status(401).send({
            msg: "EL token no es valido - enterprise no existe en la DB fisicamente",
        });
    }

    req.enterprise = enterpriseFind;

    next();
} catch (error) {
    throw new Error(error);
    
}


module.exports ={ validateJWT };