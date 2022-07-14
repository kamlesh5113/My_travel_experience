const {users} = require('../Model/Model');
const HttpError = require('../Model/Error_model');

const bcrypt = require('bcryptjs');

const getuser = async(req,res)=>{
    const id = req.params.id;
    
    
    try{
        const user = await users.findById(id);
        if(user)
        {
            res.json(user);
        }
        else{res.send(false)}
    }catch(err)
    {
        res.send(err);
    }
}

const getUser = async(req,res)=>{
    try{
        const user = await users.find();
        if(user)
        {
            res.json(user);
        }
        else
        {
            res.send(false);
        }
    }
    catch(err){
        req.send(err);
    }
}

const updateuser= async(req,res)=>{
  
    const id = req.params.id;

    const user = {
        name:req.body.name,
        email:req.body.email,
        Address:req.body.Address
    }
    
    try{
        await users.findByIdAndUpdate(id,user);
        res.send(true);
    }catch(err){
        res.send(err);
    }
}

const Adduser = async (req,res,next) =>{
    const {name,email,password,Address} = req.body;
    
    let find;
    try{
          find = await users.findOne({email: email});
    }catch(err){
       return res.send(err);
    }
    if(find)
    {
        const err =  new HttpError("Email Alerdy Exist",422);
        return next(err);
    }
    let hashedpassword;
    try{
        hashedpassword = await bcrypt.hash(password, 12);
    }catch(err){
        return res.send(false);
    }
    const useradd = new users({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword,
        Address:req.body.Address,
        img: req.file.path
    });
    console.log(users);
    try
    {
        await useradd.save();
        res.send(true);
        console.log("User Signed Up Successfull!");
    }
    catch(error){
        res.send(false);
    }
}

const login = async (req, res ) => {

    let existingUser;
    const {email, password} = req.body;

    try {
      existingUser = await users.findOne({email: email});
    } catch (err) {
      res.send(false);
    }

  
    if (!existingUser ) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      res.send(false);
    }
     else{
        let isvalidpassword = false;
        try{
            isvalidpassword = await bcrypt.compare(password,existingUser.password);
        }catch(err){
            res.send(false);
        }

        if(!isvalidpassword)
        {
            res.send(false);
        }else{
        res.json(existingUser);
        console.log("Logged In!");
    }
     }  
    
  };

module.exports = {Adduser, login, getuser, getUser,updateuser};