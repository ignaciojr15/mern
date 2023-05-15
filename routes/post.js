const express =require('express');
const router =express.Router();
// ROUTE GET api/users
// desc test route
//acces public 
router.get('/',(req,res) => {res.send('USE ROUTES post')})

module.exports=router;