'use strict'

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const database =process.env.DATABASE
require('dotenv').config();

const connection = async()=>{
     try {
         await mongoose.connect(database);
         console.log("Conexion a la base de datos con exito");
     } catch (error) {
        throw new Error('Error al conectarse a la base de datos');
        
     }
};

module.exports ={
    connection,
}