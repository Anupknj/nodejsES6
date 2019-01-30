import  jwt from 'jsonwebtoken';
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

module.exports ={
    generateToken(req,res){
       

        const token = jwt.sign({ id : req.params.id },process.env.secret, { expiresIn : 300 });   
          localStorage.setItem('token', token);
          console.log("session storage "+localStorage.getItem('token'));
        return token;
    },

    verifyToken(req,res){
        console.log("from auth "+req+" "+process.env.secret)
        jwt.verify(req,process.env.secret,(err,data)=>{
            if(err){
             console.log("autheiferr"+err)
             if(err.name=="TokenExpiredError"){
                console.log("dead....refreshing")
                let rToken = this.refreshToken();

                res.send({
                    "message" : "Token is expired.New token has been generated..please use this",
                    "token" : rToken
                })

             }
             res.send(err)
            }
            if(data){
              console.log("authdifdata"+data)
              
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
        return jwt.sign({ name : "refreshToken" },process.env.secret, { expiresIn : 600});
        

      }
}