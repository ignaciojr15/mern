const express =require('express');
const router =express.Router();
const auth=require('../middleware/auth');
const Profile = require('../models/Profile')
const User= require('../models/user')
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered

router.get('/prueba',(req,res) => {res.send('jose mourinho')})
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
router.post(
  '/',
 [ auth,
 [ check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty()]],
  async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   
    }
    console.log("hoalsdffd")
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
    const profileFields={};
    profileFields.user=req.user.id;
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(location) profileFields.location=location;
    if(bio) profileFields.bio=bio;
    if(status)profileFields.status=status;
    if(githubusername)profileFields.githubusername=githubusername;
    if(skills){
      console.log(123)
      profileFields.skills=skills.split(',').map(skill=>skill.trim())
    }
    console.log(req.body.status)
     res.send('hello');
  }
);


module.exports=router;