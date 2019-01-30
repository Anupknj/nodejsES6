import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id :{
        type : String
    },
    name :{
        type : String
    },

    info : {
        type : String
    },

    createdDate : { 
        type : String
    },

    success : Boolean

});

var user = mongoose.model("user",UserSchema)
export default user;