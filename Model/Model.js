const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password:String,
        Address:String,
        img: String
    }
);

const placesSchema = new mongoose.Schema(
    {
        uid: String,
        title: String,
        description: String,
        Address:String,
        img:String
    }
);

const backgroundImg = new mongoose.Schema({
    img:{
        data: Buffer,
        contentType: String
    }
});

const places = mongoose.model(  "places" , placesSchema);
const users = mongoose.model( "users",usersSchema );
const backgrounds = mongoose.model("backgrounds",backgroundImg);
module.exports = { places, users, backgrounds };
