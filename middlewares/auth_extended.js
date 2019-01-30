const jwt = require('jsonwebtoken');


module.exports ={
    generateToken(req,res){
        
        const token = jwt.sign({ id : req.params.id },process.env.secret, { expiresIn : process.env.noOfMin * 60 });
        return token;
    },

    verifyToken(req,res){
        console.log("from auth "+req+" "+process.env.secret)
        jwt.verify(req,process.env.secret,(err,data)=>{
            if(err){
             console.log("autheiferr"+err)
             if(err.name=="TokenExpiredError"){
               
             }
             res.send(err)
            }
            if(data){
              console.log("authdifdata "+data)
              
            }
        })
    },

    ensureToken(req, res, next) {
        const bearerHeader = req.headers["authorization"];
        
        if (typeof bearerHeader !== 'undefined') {
          const bearer = bearerHeader.split(" ");
          const bearerToken = bearer[1];
          req.token = bearerToken;
          
          next();
        } else {
          res.sendStatus(403);
        }
      },

      refreshToken(){
        return jwt.sign({ name : "refreshToken" },process.env.secret, { expiresIn : 60 * 60 });
        

      }
}