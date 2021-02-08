const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    // Delete tests output
    // console.log(token);
    // console.log(process.env.AUTH_TOKEN);
    // const test = jwt.verify(token, process.env.AUTH_TOKEN);
    // console.log(test);
    //
    if(!token) return res.status(401).send('Access denied.');
    try{
        const verified = jwt.verify(token, process.env.AUTH_TOKEN);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}