'use strict'

const express = require("express");
const app = express();
require('dotenv').config();
const {connection} = require('./src/database/connection');
const routes = require('./src/routes/enterprise.routes');
const port = process.env.PORT;

connection();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/api', routes);

app.listen(port,()=>{
    console.log(`Servidor conectado en el puerto${port}`);
});
