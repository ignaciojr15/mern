const express =require('express');
const router =express.Router();
// ROUTE GET api/users
// desc test route
//acces public 
router.get('/register',(req,res) => {res.send('USE ROUTES')})

module.exports=router;