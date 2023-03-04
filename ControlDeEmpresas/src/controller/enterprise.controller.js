'use strct'

const Enterprise = require('../models/enterprise.model');
const  bcrypt =require('bcrypt'); 
const {generateJWT} = require('../helpers/create-jwt');
//CRUD EMPRESAS Y SUCURSALES

const createEnterprise = async(req, res)=>{
    const {email, password } = req.body;
    try {
         let enterprise = await Enterprise.findOne({email:email});
         if(enterprise){
            return res.status(400).send({
                msg:'ya existe una empresa con este con este correo',
                ok:false,
                enterprise:enterprise

            })      
         }
         enterprise = new Enterprise(req.body);

         const saltos = bcrypt.genSaltSync();
         enterprise.password = bcrypt.hashSync(password, saltos);

         enterprise = await enterprise.save();

         const token = await generateJWT(enterprise.id, enterprise.name, enterprise.email);
         res.status(200).send({
            msg:`Empresa ${enterprise.name} creadon correctamente`,
            enterprise,
            token,
         });

    } catch (error) {
        throw new Error(error)
    }

};

const readEnterprise = async(req, res)=>{
    try {
        const enterprise = await Enterprise.find();
        if(!enterprise){
            res.status(400).send({msg:'No hay empresas para mostrar'});

        }else{
            res.status(200).json({enterprise:enterprise})
        }
    } catch (error) {
        throw new Error(error)
    }
};

const updateEnterprise = async(req, res) =>{
     try {
         const id=req.params.id;
         const enterpriseEdit = {...req.body}

         enterpriseEdit.password = enterpriseEdit.password
         ? bcrypt.hashSync(enterpriseEdit.password, bcrypt.genSaltSync())
         : enterpriseEdit.password;
         const enterpriseComplete = await Enterprise.findByIdAndUpdate(id, enterpriseEdit,{
              new:true
         });
           //TOKEN PENDIENTE
         if(enterpriseComplete){
                 const token = await generateJWT(enterprise.id, enterprise.name, enterprise.email)
                 return res.status(200).send({msg:'datos actualizados correctamente', enterpriseComplete, token});

         }else{
               res.status(404).send({msg:'No se pudo actualizar el formulario'});
         }
     } catch (error) {
        throw new Error(error);
     }
};

const deleteEnterprise = async(req, res) =>{
     try {
         const id = req.params.id;
         const enterpriseDelete  = await  Enterprise.findByIdAndDelete(id);
         return res.status(200).send({msg:'Empresa eliminada con exito', enterpriseDelete}); 
     } catch (error) {
         throw new Error(error)
     }
};

const addOffice = async(req, res) =>{
    try {
        const id = req.params.id;
        const {location, noOffice} = req.body;

        const enterpriseOffice = await Enterprise.findByIdAndUpdate(
           id,
           {
            $push :{
                 branchOffice:{
                    location: location,
                    noOffice: noOffice,
                 },
            },
          },
          {new: true}
        );
        if(!enterpriseOffice){
               return res.status(404).send({msg:'Enterprise no encontrado'});
        }
        return res.status(200).send({enterpriseOffice});
    } catch (error) {
        throw new Error(error);
    }
};


const updateOffice = async(req, res) =>{
    const id = req.params.id;
    const {idbranchOffice, location, noOffice} = req.body;
    try {
        const editOffice = await Enterprise.updateOne(
         {_id: id, "branchOffice._id": idbranchOffice},
         {
          $set:{
                "branchOffice.$.location": location,
                "branchOffice.$.noOffice": noOffice,
                "branchOffice.$.idbranchOffice": idbranchOffice,

            },
         },
         {new: true}

        );
        if(!editOffice){
            return res.status(404).send({msg:"No existe la empresa"});
        }

        return res
         .status(200)
         .send({editOffice, msg:"Office agregada correctamente"});
        
    } catch (error) {
        throw new Error(error);
    }
};

const deleteOffice = async(req, res) =>{
     const id = req.params.id;
     const {idbranchOffice} = req.body;
     try {
        const deleteOffice = await Enterprise.updateOne(
            {id},
            {
                $pull: {branchOffice: {_id: idbranchOffice}},
            },
            {new: true, multi: false}
            
        );
        if(!deleteEnterprise){
            return res.status(404).send({ msg: "no existe la empresa" });
        }

        return res.status(200).send({ deleteOffice });
     } catch (error) {
        throw new Error(error);
     }
};

module.exports ={
    createEnterprise,
    readEnterprise,
    updateEnterprise,
    deleteEnterprise,
    addOffice,
    updateOffice,
    deleteOffice,

}