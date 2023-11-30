// users.js
import express from 'express'
import { check, validationResult } from 'express-validator';

const router = express.Router();
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';




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
    

    const {name, email, password } = req.body;

    try {
        let user = await User.findOne({email});
        console.log(user);

        if(user){
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        });
        console.log(user);

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //Return jsonwebtoken
        const payload = {
            user:{
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn:360000},
            (err,token) => {
                if(err)throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        role: user.role,
                        membership: user.membership,
                        membershipExpiryDate: user.membershipExpiryDate,
                        rewardPoints: user.rewardsPoints,
                        pastMovies: user.pastMovies,
                        bookings: user.bookings,
                        date: user.date
                    },
                });
            }
            );

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error... ');
    }
})

export default router;
