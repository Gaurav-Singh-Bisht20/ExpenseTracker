const User = require('../models/User.model');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


exports.signup = async (req,resp)=>{
    try{
        const{
            username,
            password,
            email
        } = req.body;

        if(!username || !email || !password ){
            return resp.status(403).json({
                success: false,
                message: 'all feilds are required',
                username,email,password
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return resp.status(400).json({
                success:false,
                message :'user already registered'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        return resp.status(200).json({
            success : true,
            message:'account created successfully',
            user
        })
    
    }
    catch(error){
        console.log(error)
        return resp.status(500).json({
            success: false,
            message:'user can not be registered'

        })
    }
}

exports.login = async (req,resp)=>{
    try{
        const {
            email,
            password
        } = req.body;

        if(!email, !password){
            return resp.status(403).json({
                success : false,
                message : 'all feild are required'
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return resp.status(403).json({
                success: false,
                message : 'user are not registered'
            })
        }
        
        const comparePassword = await bcrypt.compare(password,user.password)
        if(comparePassword){
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return resp.status(200).json({
                success : true,
                message : 'login successfully',
                token
            })
        }
        else{
            return resp.status(400).json({
                success : false,
                message : 'wrong password'
            })
        }
    }catch(err){
        return resp.status(400).json({
            success: false,
            message : 'could not login'
        })
    }
}