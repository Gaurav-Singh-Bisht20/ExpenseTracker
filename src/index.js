const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const {v4:uuidv4} = require('uuid');

const app = express();
app.use(express.json());

dotenv.config();


const uniqeLink = uuidv4();
// mongodb connection

mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
}).then(()=>console.log('mongodb connect'))
.catch((err)=>{
    console.log('mongodb connection failed ',err)
})


const PORT = process.env.PORT || 8002;

const userRoutes = require ('./routes/userroute.js');

app.use('/api/v1',userRoutes);

app.get('/',(req,resp)=>{
    resp.send(uniqeLink)
});

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
})
