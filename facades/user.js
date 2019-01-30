import moment from 'moment';
import uuid from 'uuid';
import people from '../models/user';
const joi = require('../middlewares/requestValidator');


class user{
    constructor(){

    }

    createUser(req,res){
        let newUser = {
            id : uuid.v4(),
            name : req.body.name || '',
            info : req.body.info || '',
            createdDate : moment.now(),
            
        };
        
       joi.validate(newUser,res);

        people.create(newUser)
        
        .then(newUser=>{
            newUser.success=true;
            console.log(newUser);
            // newUser['success']= true;
            joi.sendResponse(res, null, newUser, true);
           
        }).catch(err=>{
            joi.sendResponse(res, {success: false, msg: error.msg}, null, true);
        })
        
    }

    findOneUser(req,res){
         people.findOne({ id : req.params.id}).then(people=>{
             res.status(200).send(people)
         }).catch(err=>{
             res.status(400).send(err)
         });
    }

    findAllUser(req,res){
        console.log("core")
        console.log("process.cwd() : "+process.cwd());
        console.log("__dirname : "+__dirname);
        console.log("./ "+'./')
        people.find().then(peoples=>{
            
            res.send(peoples)
            
        }).catch(err=>{
            res.status(400).send(err)
        });
    }

    updateUser(req,res){
        people.update({ id : req.params.id } , { $set :{ name : req.body.name, info : req.body.info} }).then(people=>{
            res.status(200).send(people)
        }).catch(err=>{
            res.status(400).send(err)
        });
    }

    deleteUser(req,res){
      people.remove({ id : req.params.id}).then(()=>{
          res.status(204).send("deleted")
      }).catch(err=>{
          res.status(400).send(err)
      });  


    }

   
}

export default new user();