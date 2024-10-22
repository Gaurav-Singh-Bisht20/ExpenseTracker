const express = require('express')
const dotenv = require('dotenv')
const {connect} = require ('../src/common/Database.js')
const cors = require('cors')

const app = express();
app.use(express.json());

dotenv.config();

// mongodb connection
connect();

app.use(cors({
    origin: '*',
}));

const PORT = process.env.PORT || 8002;

const userRoutes = require ('./routes/userroute.js');
const trackerRoutes = require ('./routes/trackerroute.js');


app.use('/api/v1',userRoutes);
app.use('/api/v1',trackerRoutes);

app.get('/',(req,resp)=>{
    resp.send('hi')
});

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
})
