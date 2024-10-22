const mongoose = require('mongoose')
const dotenv = require('dotenv')

// mongodb connection
exports.connect = async()=>{
    mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log('mongodb connect'))
.catch((err)=>{
console.log('mongodb connection failed ',err)
})}