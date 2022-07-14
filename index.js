const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const HttpError = require('./Model/Error_model');
const db = require('./db'); 

db();             // for Database Connections



 const userRouter = require('./user-router/UserRouter');
 const placeRouter= require('./place-router/PlaceRouter');

 app.use('/uploads', express.static(path.join('uploads')));

 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

  
 app.use('/api/user', userRouter);
 app.use('/api/places', placeRouter);
 


 app.use((req,res,next) => {                                  // To Throw error if routes is not give the write way (e.g = /api/users );
    const error = new HttpError("Could not found the correct route",404);
    throw error;
 });

 app.use((error,req,res,next) =>{                        // to catch error from upper middleware.....
   if(req.file)
 {
      fs.unlink(req.file.path,(err)=>{
      });
 }
   
   if(res.headerSent)
    {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || "Unkown error"});
 });



app.listen(process.env.PORT || 5000,(req,res) =>{            // To make connections to server
    console.log("Connected to Server");
});