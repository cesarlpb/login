const router = require('express').Router();
const verify = require('../verifyToken');

router.get('/', verify , (req, res) => {
    res.json({
        posts: {
            title: 'my first post', 
            description: 'asdad'}
        })
    //res.send(req.user); // Delete
});

module.exports = router;