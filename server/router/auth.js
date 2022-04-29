const express = require('express');
const router = express.Router();
require('../db/conn');
const User =require("../models/userschema");
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken'); 
const authenticate =require('../middleware/authenticate');

router.get('/',(req,res) => {
    res.send(`Hello`);
});


router.post('/register',async (req,res) =>{
    const{ name,email,password,cpassword}=req.body;
   
    if(!name || !email || !password || !cpassword){
        return res.status(422).json({error: "Please!fill the fields properly"});
    }

    try{
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error :"Email already exists"});
        }else if (password!= cpassword) {
            return res.status(422).json({error :"password don't match"});

        }else{
            const user= new User ({name,email,password,cpassword});

            await user.save();
        
            res.status(201).json({message :"sucessfully saved"});

        }    
    } catch(err) { 
        console.log(err);
    }

    
});


router.post('/signin',async (req,res) =>{
    
    try{
        let token;
        const{email,password}= req.body;
        if( !email || !password){
            return res.status(400).json({error:"PLlease fill data"})
        }
        const userLogin = await User.findOne({email:email })


        if (userLogin){
            const isMatch =await bcrypt.compare(password,userLogin.password);
            token = await userLogin.generateAuthToken();
            res.cookie("jwtoken",token, {
                expires:new Date (Date.now()+25892000000),
                httpOnly:true

            });

        //console.log(userLogin);
        if (!isMatch){
            res.status(400).json({error:"invalid credientials 'password'"});
        }else{
            res.json({message:"signin sucessfully"});
        }
    }else{
        res.status(400).json({error:"invalid credientials"});
    }


       

    }catch(err){
        console.log(err);

    }
});


router.get('/home',authenticate,(req,res) =>{
    res.send(req.rootUser);

});

router.post('/lots',authenticate,async (req,res) =>{
    const{ lot }=req.body;
   
    if(!lot){
        return res.status(422).json({error: "Please!fill the fields properly"});
    }

    try{
        const userExist = await User.findOne({lot:lot})
        if(userExist){
            return res.status(422).json({error :"Already booked"});
        }else{
            const user= new User ({lot});

            await user.save();
        
            res.status(201).json({message :"sucessfully saved"});

        }    
    } catch(err) { 
        console.log(err);
    }

    
});

router.get('/lotss',authenticate,(req,res) =>{
    return res.send(User.name);
    console.log(User.name);

});


router.get('/logout',(req,res) =>{
    console.log('logged out');
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('user logged out');
});

module.exports= router;