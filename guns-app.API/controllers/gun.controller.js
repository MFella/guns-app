import gun from '../models/gun';
import vm from "v-response"

exports.create_gun = (req,res,next) => {
    const new_gun = new Gun(req.body);

    new_gun.save()
        .then(saved => {
            if(!saved)
            {
                return res.status(400).json(vm.ApiResponse(false, 400, "Unable to save this gun, try again!"));
            }

            if(saved)
            {
                return res.status(201).json(vm.ApiResponse(true, 201, "Product created successfully", saved));
            }
        }).catch(err => {
            return res.status(500).json(vm.ApiResponse(false, 500, "An error occured", undefined, error));
        })
}