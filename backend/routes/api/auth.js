import express from 'express'
const router = express.Router();
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { auth } from '../../middleware/auth.js';
import User from '../../models/User.js';

router.get('/', auth, async (req,res)=> {
    try{
        const user = await User.findById(req.user.id).select('-password').populate('bookings')
        // Define an array of paths to populate
        // const pathsToPopulate = user.bookings.map((booking, index) => `bookings.${index}.theatre`);
        const pathsToPopulate = [];
        for (let index = 0; index < user.bookings.length; index++) {
            const moviePath = `bookings.${index}.movie`;
            const theatrePath = `bookings.${index}.theatre`;
            const timingPath = `bookings.${index}.timing`;
            pathsToPopulate.push(moviePath);
            pathsToPopulate.push(theatrePath);
            pathsToPopulate.push(timingPath);
        }
        // const pathsToPopulate = user.bookings.map((booking, index) => [
        //     `bookings.${index}.movie`,
        //     `bookings.${index}.theatre`,
        //     `bookings.${index}.timing`,
        // ]);

        // const flattenedPaths = [].concat(...pathsToPopulate);
        console.log(pathsToPopulate);
        // for (let i = 0; i < user.bookings.length; i++) {
        //     await user.bookings.populate(`movie`);
        //     await user.bookings.populate(`theatre`);
        //     await user.bookings.populate(`timing`);
        // }
        // Use populate with the array of paths
        await user.populate(pathsToPopulate);
        // await user.populate('booking');

        // for (let i = 0; i < user.bookings.length; i++) {
        //     await user.populate({ path: `bookings.${i}.theatre bookings.${i}.timing bookings.${i}.movie` }).execPopulate();
        // }

        // await doc.populate(['path1', 'path2']);
          

        console.log("This is user", user);
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/',[
    
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
], 
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({errors: [{msg: 'Invalid Crendentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(user);
        if(!isMatch){
            return res
            .status(400)
            .json({errors: [{msg: 'Invalid Crendentials'}]}); 
        }


        console.log(user);
        //Return jsonwebtoken
        const payload = {
            user:{
                id: user.id,
            }
        }
        console.log(payload);
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
                        rewardsPoints: user.rewardsPoints,
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
