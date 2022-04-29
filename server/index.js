
const mongoose =require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')

require('dotenv').config({path :'./config.env'});


const {PythonShell} =require('python-shell');
var router = express.Router();
const app= express();
app.use(cookieParser())
//dotenv.cofig ({path :'./config.env'});
const port= process.env.PORT || 4000;

require('./db/conn');
app.use(express.json());

const authenticate =require('./middleware/authenticate');



app.use(require('./router/auth'));

app.use(require('./router/lots'));
//const User= require('./models/userschema');



app.get("/locss", authenticate,(req, res)=>{
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        //args: [''] //An argument which can be accessed in the script using sys.argv[1]
    };
     
 
    PythonShell.run('mainlot.py', options, function (err,result){
        if (err) throw err;
        
        // result is an array consisting of messages collected
          //during execution of script.
          console.log('result: ', result.toString());
          //router.get('/', function(req, res, next) {
          //res.render('index', { p :'result' });
          //});
          const plt =[];
          plt.push(result);
          console.log(typeof(plt));
          return res.send(plt);

          //return res.send(result.toString());
        
        
        
    });
});




app.get("/lots", authenticate,(req, res)=>{
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        //args: [''] //An argument which can be accessed in the script using sys.argv[1]
    };
     
 
    PythonShell.run('main.py', options, function (err,result){
        if (err) throw err;
        
        // result is an array consisting of messages collected
          //during execution of script.
          console.log('result: ', result.toString());
          //router.get('/', function(req, res, next) {
          //res.render('index', { p :'result' });
          //});
          const li =[];
          li.push(result);
          console.log(typeof(li));
          return res.send(li);

          //return res.send(result.toString());
        
        
        
    });
});



//app.get('/lotss' , (req,res) => {
    
  //  res.send(`hiee`);
  //});
  



app.get('/contact',(req,res) =>{
    res.send(`Hello`);

});
app.get('/register',(req,res) =>{
    res.send(`Hello`);

});
app.get('/signup',(req,res) =>{
    res.send(`Hello`);

});

// Get request to send the data to the server









app.listen(port,()=> {
    console.log(`running`);
})
