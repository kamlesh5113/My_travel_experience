const express = require('express');
const uploadFile = require('../MiddleWare/UploadImage');

const router = express.Router();

const {Adduser,login,getuser,getUser,updateuser} = require('../user-controller/userController');

router.post('/signup',uploadFile.single('image'), Adduser);

router.post('/login',login);

router.get('/',getUser);

router.get('/:id',getuser);

router.put('/:id',updateuser);

module.exports = router;