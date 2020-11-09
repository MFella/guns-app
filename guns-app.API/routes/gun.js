
const Gun = require('../models/gun');
const express = require('express');
const router = express.Router();

router.post("/create", Gun.create);

module.exports = router;

// Gun.create_gun = (req,res,next) => {
//     const new_gun = new Gun(req.body);

//     new_gun.save()
//         .then(saved => {
//             if(!saved)
//             {
//                 return res.status(400).json(vm.ApiResponse(false, 400, "Unable to save this gun, try again!"));
//             }

//             if(saved)
//             {
//                 return res.status(201).json(vm.ApiResponse(true, 201, "Product created successfully", saved));
//             }
//         }).catch(err => {
//             return res.status(500).json(vm.ApiResponse(false, 500, "An error occured", undefined, error));
//         })
// }

router.get('/all', (req,res,next) => 
{
    Gun.getAllGuns((err, guns) => 
    {
        if(err) throw err;

        if(guns)
        {
            guns.sort((a,b) => (a.name > b.name)? 1: ((b.name > a.name)? -1 : 0));
            res.json({guns: guns});
            return;
        }

        res.json({});

    })
})

router.post('/specific', (req,res,next) => 
{
    Gun.getSpecificGuns(req.body,(err, guns) => 
    {
        //console.log(guns);
        if(err) throw err;

        if(guns)
        {
            guns.sort((a,b) => (a.name > b.name)? 1: ((b.name > a.name)? -1 : 0));
            res.json({guns: guns});         
            return;
        }

        res.json({});
    })
})