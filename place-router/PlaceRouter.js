const express = require('express');
const fileUpload = require('../MiddleWare/UploadImage');
const router = express.Router();

const {updatePlaces,AddPlace, getPlaces, getPlacesbyid, deletePlaces,getPlacesbyID} = require('../place-controller/placeController');


router.post('/',fileUpload.single('image'),AddPlace);

router.get('/',getPlaces);

router.get('/:id',getPlacesbyid);

router.delete('/:id',deletePlaces);

router.get('/byid/:id',getPlacesbyID);



router.put('/:id',updatePlaces)
//
module.exports = router;