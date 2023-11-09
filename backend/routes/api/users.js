// users.js
import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';

import User from '../../models/User';

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password',
    'Please enter a password with 6 or more characters').isLength({min:6})
], 

async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password } = req.body;

    try {
        let user = await User.findOne({email});

    if(user){
        res.status(400).json({errors: [{msg: 'User already exists}'}]});
    }

    //Get users gravatar

    //Encrypt password

    //Return jsonwebtoken



    res.send('User route');

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server err');
    }

    
})

export default router;
