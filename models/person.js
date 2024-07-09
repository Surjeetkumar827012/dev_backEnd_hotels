const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
// define the person schema
const personSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    Salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

personSchema.pre('save', async function(next){
    const person=this;
    // Hash the password only if it has been modified(or is new)
    if(!person.isModified('password')) return next();

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);
        //hash password
        const hashedPassword= await bcrypt.hash(person.password,salt);
        //Override the plain password with the hashed one
        person.password=hashedPassword;
        next();
    }
    catch(err){

    }
})
/**working
    store passwrod   surjeet ---> lkdasfokjfoihwjeiofjojao441651
    try to login with this password -----> agarwal

    from store password --> lkdasfokjfoihwjeiofjojao441651 ---> extract salt
    salt+agarwal ----> hash ----> jflajsldfjoafrioewjfkjewakjfi534564

    so hash function doesn't match.

 */
personSchema.methods.comparePassword= async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

//create preson model
const Person=mongoose.model('Person',personSchema);
module.exports=Person;