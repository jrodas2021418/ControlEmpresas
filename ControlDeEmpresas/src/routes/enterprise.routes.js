'use strict'

const {Router} = require('express');
const { createEnterprise, readEnterprise, updateEnterprise, deleteEnterprise, addOffice, updateOffice, deleteOffice } = require('../controller/enterprise.controller');

const api = Router();

api.post ('/create-enterprise', createEnterprise);
api.get('/read-enterprise', readEnterprise);
api.put('/update-enterprise/:id', updateEnterprise);
api.delete('/delete-enterprise/:id', deleteEnterprise );
api.put('/add-Office/:id', addOffice);
api.put('/update-office/:id', updateOffice);
api.delete('delete-office/:id', deleteOffice);
module.exports =api;