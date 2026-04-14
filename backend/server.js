const express= require('express')
require('dotenv').config()
const  connectToMongo =  require('./db/db')
const cors = require('cors')
const app=express();



const  authRouter  = require('./routes/auth')
const  noteRouter  = require('./routes/note')


app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))


connectToMongo()
app.use('/api',authRouter);
app.use('/api/note',noteRouter);

app.listen(process.env.PORT,()=>{
    
    console.log("server running");
})
