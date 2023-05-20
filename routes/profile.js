const express =require('express');
const router =express.Router();
const auth=require('../middleware/auth');
const Profile = require('../models/Profile')
const User= require('../models/user')
// ROUTE GET api/profile
// desc test route
//acces Private 
router.get('/',auth, async(req,res) => {
 try{
    const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
    if(!profile){
        return res.status(400).json({msg: "there is not prfile for this user"});
    }
    res.json(profile);
 }catch(err){
    console.error(err.message)
    res.status(500).send('server Error')
}
});

module.exports=router;