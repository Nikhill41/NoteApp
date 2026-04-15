const express= require('express')
require('dotenv').config()
const  connectToMongo =  require('./db/db')
const cors = require('cors')
const app=express();



const  authRouter  = require('./routes/auth')
const  noteRouter  = require('./routes/note')


app.use(express.json());
app.use(cors({
    origin: [
        process.env.FRONTEND_PORT,
        "https://note-app-nikhil.netlify.app/"
    ],
    credentials: true   // ✅ VERY IMPORTANT
}));


const PORT=process.env.PORT || 8080

connectToMongo()
app.use('/api',authRouter);
app.use('/api/note',noteRouter);

app.listen(PORT,()=>{
    
    console.log("server running");
})
