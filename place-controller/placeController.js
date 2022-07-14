const {places,background} = require('../Model/Model');
const fs = require('fs');


const AddPlace = async (req,res) =>{
    const placeadd = new places({
        uid:req.body.uid,
        title:req.body.title,
        description:req.body.description,
        Address:req.body.Address,
        img:req.file.path
    });

    try
    {
        await placeadd.save();
        res.send(true);
    }
    catch(error){
        res.send(error);
    }
};



const getPlaces = async (req,res) =>{
    let pl = "My Travel Experience";
   try{
    const Places = await places.find();
    res.send( Places );
   }catch(err){
    console.log("No data Found!");
    res.json({message: err});
   }
};

const getPlacesbyid = async(req,res)=>{
    const id = req.params.id;
    try{
        const place = await places.find({uid:id});
        if(place)
        {res.send(place);}
        else
        {res.send(false)}
    }
    catch(err){
        res.send(err);
    }
}

const getPlacesbyID = async(req,res)=>{
    const id = req.params.id;
    try{
        const place = await places.findById(id);
        if(place)
        {res.send(place);}
        else
        {res.send(false)}
    }
    catch(err){
        res.send(err);
    }
}

const updatePlaces = async (req,res) =>{
    
    const id = req.params.id;
    

    const newPlace = {
        title : req.body.title,
        description : req.body.description,
        Address : req.body.Address
    };
    
    try{
        await places.findByIdAndUpdate(id,newPlace);
    if(places)
    {res.send(true);}
    else{res.send(false);}
    }catch(err){
        res.send(err);
    }
};

const deletePlaces = async (req,res) =>{
    const id = req.params.id;
    let pla;
    try{
        pla = await places.findById(id);
    }catch(err){
        res.send(false);
    }
    let image = pla.img;
    try{
        await places.findByIdAndDelete(id);
        res.send(true);
        fs.unlink(image,err=>{});
    }catch(err){
        res.send(err)
    }
};

module.exports = {AddPlace,getPlaces,updatePlaces,deletePlaces,getPlacesbyid,getPlacesbyID};