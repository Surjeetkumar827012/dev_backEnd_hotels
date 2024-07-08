/*const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/menu');


router.post('/',async(req,res)=>{
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

router.get('/',async(req,res)=>{
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

router.get('/:tasteType', async(req,res)=>{
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

module.exports=router;
*/