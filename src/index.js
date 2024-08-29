const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express();
app.use(express.json());

dotenv.config();

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
const trackerRoutes = require ('./routes/trackerroute.js');


app.use('/api/v1',userRoutes);
app.use('/api/v1',trackerRoutes);

app.get('/',(req,resp)=>{
    resp.send(uniqeLink)
});

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
})
