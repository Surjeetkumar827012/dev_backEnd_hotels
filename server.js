const express = require('express')
const app = express()   //now all the express fuctionallity added to the app. Now the app is capable to generate the sever.
// Now a serveris created.
// Now the server is ready to work. we created server or waiter intity. Now further we created menu(API) which waiter can understand.

const db=require('./db');

const personRoutes=require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuRoutes=require('./routes/menuRoutes');
app.use('/menu', menuRoutes);


const bodyParser=require('body-parser');
app.use(bodyParser.json());  //req.body

app.get('/', function(req,res){
    res.send('Welcome to my hotel... How can I help You?')
})

app.listen(3000, ()=>{
    console.log('listening onport 3000')
})  /* this is the port no. in lay man language we are difining the room of the waiter or server. now the server runs
                     runs in a local host in the computer let say computer is our building in which large no of rooms so we need 
                     port no to define the waiter room or server location.*/