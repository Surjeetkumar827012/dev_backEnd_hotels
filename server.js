const express = require('express')
const app = express()   //now all the express fuctionallity added to the app. Now the app is capable to generate the sever.
// Now a serveris created.
// Now the server is ready to work. we created server or waiter intity. Now further we created menu(API) which waiter can understand.

const db=require('./db');
const MenuItem=require('./models/menu');
const Person=require('./models/person');
require('dotenv').config();
const PORT=process.env.PORT || 3000;

//import Authentation
const passport=require('./auth');
app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});

//Middleware fuction
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}

//const personRoutes=require('./routes/personRoutes');
//app.use('/person', personRoutes);

//const menuRoutes=require('./routes/menuRoutes');
//app.use('/menu', menuRoutes);


const bodyParser=require('body-parser');
app.use(bodyParser.json());  //req.body

app.use(logRequest);
app.get('/',localAuthMiddleware, function(req,res){
    res.send('Welcome to my hotel... How can I help You?')
})




app.post('/menu',async(req,res)=>{
    try{
         const data=req.body;
         const newMenu=new MenuItem(data);
         const response= await newMenu.save();
         console.log('data saved');
         res.status(201).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server Error'});
    }
})
// to get the data from the database

app.get('/menu',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('data fetch');
        res.status(200).json(data);
    }
    catch{
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

app.get('/menu/:tasteType', async(req,res)=>{
    try{
            const tasteType=req.params.tasteType;
            if(tasteType=='sweet' || tasteType=='spicy' || tasteType=='sour'){
                const response= await MenuItem.find({taste:tasteType})
                console.log('response fetched');
                res.status(200).json(response);  
            }
            else{
                req.status(404).json({error: 'Invalid work type'});
            }
    }
    catch{
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})



app.post('/person', async(req, res)=>{
    try{
        const data=req.body;  // Assuming the request body contains the person data

        const newPerson=new Person(data);

        const response= await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

app.get('/person',localAuthMiddleware,async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetch');
        res.status(200).json(data);
    }
    catch{
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//now we are trying to fetch the data of the people working in the particular domain like we want the data of all the chef 
// this is parametrised call
app.get('/person/:workType',async (req,res)=>{
    try{const workType=req.params.workType;
    if(workType=='chef' || workType=='manager' || workType=='waiter'){
        const response= await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
    }
    else{
        req.status(404).json({error: 'Invalid work type'});
    }
}
catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
}
})

// now we are going to update the value
app.put('/person/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const updatePersonData= req.body;

        const response= await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,     //return the updated document
            runValidators: true    // Run mongoose validation
        })
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
    res.status(500).json({error:'Internal Server Error'});
    }
})

app.delete('/person/:id', async(req,res)=>{
    try{
        const personId=req.params.id;
        
        const response= await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Internal Server Error'});
        }
        console.log('data delete');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})



app.listen(PORT, ()=>{
    console.log('listening onport 3000')
})  /* this is the port no. in lay man language we are difining the room of the waiter or server. now the server runs
                     runs in a local host in the computer let say computer is our building in which large no of rooms so we need 
                     port no to define the waiter room or server location.*/