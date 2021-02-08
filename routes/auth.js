const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    // Perform Register Validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    // Check if user exists in DB
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
        name:       req.body.name,
        email:      req.body.email,
        password:   hashedPassword
    });
    try{
        const savedUser =  await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    // Perform Login Validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if email exists in DB
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');
    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Email or password is wrong");
    // Auth Token
    const auth_token = jwt.sign({_id: user._id}, process.env.AUTH_TOKEN);
    res.header('auth-token', auth_token).send(auth_token);
    // res.send("You are successfully logged in... Welcome to CoinVille!");
});

module.exports = router;