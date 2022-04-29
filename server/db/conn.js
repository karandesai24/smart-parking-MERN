const mongoose =require('mongoose');
mongoose.connect('mongodb+srv://karan:karansmartparking@smartparking.4tpih.mongodb.net/Data',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> {console.log(`sucess`);
}).catch(err=>{
console.log(err)
});