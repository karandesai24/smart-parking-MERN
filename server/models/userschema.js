const validator =require("validator");
const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const mongoose =require('mongoose');
//dotenv.cofig ({path :'./config.env'});
const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email");
              
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
        token:{
            type:String,
            required:true}
        }
    ]
})

userSchema.pre('save',async function(next) {
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
});


userSchema.methods.generateAuthToken = async function(){
    try{
        let token =jwt.sign({_id:this._id},'qwertyuioplkjhgfdsazxcvbnmmnbvcx');
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(err)
    {
        console.log(err);

    }

}
const User=mongoose.model('USER',userSchema);
module.exports= User;