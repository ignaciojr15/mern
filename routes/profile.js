const express =require('express');
const router =express.Router();
const auth= require('../middleware/auth')
const Profile=require('../models/Profile');
const User= require('../models/user')
const axios = require('axios'); 
// bring in normalize to give us a proper url, regardless of what user entered
const { normalize } = require('valid-url'); // Importa la función normalize
const { check, validationResult } = require('express-validator');
const { route } = require('./auth');
// bring in normalize to give us a proper url, regardless of what user entered
// ROUTE GET api/users
// desc test route
//acces public 
router.get('/user/:user_id',async (req,res) => {
    try{
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile) return res.status(400).json({msg: "there is not profile user"});
        res.json(profile);
    }catch(e){
        console.error(e.message);
        res.status(500).send('Server Error')
    }
    res.send('USE ROUTES profile')
})
// delete api/profile
router.delete('/',auth,async(req,res)=>{
    try{
        await Profile.findOneAndRemove({user:req.user.id})
        //remove user
        await User.findOneAndRemove({_id:req.user.id});
        res.json({msg :"user delete"})
    }catch(err){
        res.json(err)
    }
})
//POST api/profile
router.post('/',[auth,
    [check('status','status is required')
    .not()
    .isEmpty(),
    check('skills','skills is required')
    .not()
    .isEmpty()
    ]

], async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   
    }
    console.log("hoalsdffd")
     // destructure the request
     const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    const profileFields={
        website:website,
        skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest
    };


    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      //create
      profile=new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
    
})
router.put('/experience',[auth,
    [
        check("title","title is required")
        .not()
        .isEmpty(),
        check("company","company is required")
        .not()
        .isEmpty(),
        check("from","from date is required")
        .not()
        .isEmpty()
    ]
],async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }=req.body
    const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try{
        const profile=await Profile.findOne({user:req.user.id})
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile)
    }catch(e){
        console.error(e.message)
        res.status(500).send("server error")
    }
})
//delete api/profile/experience/:exp_id
router.delete('/experience/:exp_id',auth,async (req,res)=>{
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });
    
        foundProfile.experience = foundProfile.experience.filter(
          (exp) => exp._id.toString() !== req.params.exp_id
        );
    
        await foundProfile.save();
        return res.status(200).json(foundProfile);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
      }
})


module.exports=router;