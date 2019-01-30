import userFacade from '../facades/user';
import auth from '../middlewares/auth';

const userControllers = {  

    createUser(req,res){
        if(!req.body.name && !req.body.info){
            return res.status(400).send({'message':'all fields are required'});
        }
        console.log(req.body)
        return  userFacade.createUser(req,res);
        
    },

   getAllUser(req,res){ 
       
       // auth.verifyToken(req.token,res);
        return userFacade.findAllUser(req,res);
    
    },

    getOneUser(req,res){
        return userFacade.findOneUser(req,res);
       
    },

    updateUser(req,res){
      return userFacade.updateUser(req,res);
    },

    deleteUser(req,res){
       return userFacade.deleteUser(req,res);
    },

    getToken(req,res){
       const token = auth.generateToken(req,res);
       if(token){
           res.status(200).send({"message": "Token generated","token" : token})
       }
       else{
           res.status(400).send(error);
        }
    }

}

export default userControllers;



