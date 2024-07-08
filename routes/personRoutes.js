const express=require('express');
const router=express.Router();
const Person=require('./../models/person');

router.post('/', async(req, res)=>{
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

router.get('/',async(req,res)=>{
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
router.get('/:workType',async (req,res)=>{
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
router.put('/:id',async (req,res)=>{
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

router.delete('/:id', async(req,res)=>{
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

module.exports=router;