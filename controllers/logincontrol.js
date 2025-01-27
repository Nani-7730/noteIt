const users = require('../models/modeluser');

const addUser = async(req,res)=>{
    const {username,password,email} = req.body;

    try{
        const newUser = new users({username,password,email});
        const result = await newUser.save();
        res.status(201).json(result);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

const authUser = async(req,res)=>{
    const {username,password}= req.body;
    
    try{
        const user = await users.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        if(user.password !== password){
            return res.status(401).json({message:"Invalid Password"});
        }

        res.status(200).json({message: "Authentication sucessful",user});
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}


module.exports = { addUser, authUser };