'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnterpriseSchema = Schema({
    name:{
        type: String,
        required: true
    },
    password:String,
    email: String,
    typeEnterprise: String,
    Phone: String,
    branchOffice:[{
        location:String,
        noOffice: String,
    }]   
});


module.exports = mongoose.model("enterprise", EnterpriseSchema);