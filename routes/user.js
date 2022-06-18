const {Router} = require('express');
const { postUser, login } = require('../controllers/user');




const router=Router();



router.post('/api/newUser', postUser);
router.post('/api/login',login);


module.exports=router;