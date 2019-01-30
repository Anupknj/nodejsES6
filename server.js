import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/user';
var morgan = require('morgan');
var winston = require('./config/winston');


require('dotenv').config();
//require('dotenv').load();

const app =express();

 
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
 });
 app.use(morgan('combined', { stream: winston.stream })); 
app.get('/api/',(req,res)=>{
    return res.status(200).send(
        {
            'message' : 'working'
        }
    )   
})   

app.use('/api',routes);

mongoose.Promise =global.Promise;

 mongoose.connect('mongodb://localhost/nestemp', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));


app.use(function(err,req,res,next){
    res.status(422).send({app_error : err.message});
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})

module.exports = app;