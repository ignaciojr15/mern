const express =require('express');
const router =express.Router();
const User= require('../models/user')
const auth= require('../middleware/auth')
const Post=require('../models/Post');
const { check, validationResult } = require('express-validator');
//route POST api/post
// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
    '/',
    auth,
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
        console.log(user)
        const newPost = new Post({
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        });
  
        const post = await newPost.save();
  
        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  // get api/post
  router.get('/',auth,async(req,res)=>{
    try {
        const post=await Post.find().sort({date:-1})
        res.json(post);
    } catch (e) {
        console.error(e.message);   
        res.status(500).send('Server ERROR')
    }
  });
    // get api/post
    router.get('/:id',auth,async(req,res)=>{
        try {
            const post=await Post.findById(req.params.id);
            if(!post){
                return res.status(404).json({msg : 'post not found'})
            }
            res.json(post);
        } catch (e) {
            console.error(e.message); 
            if(e.kind==='objectId'){
                return res.status(404).json({msg : 'post not found'})
            }  
            res.status(500).send('Server ERROR')
        }
      });
  // get api/post
  router.delete('/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.user.toString() !==req.user.id){
           return res.status(401).json({msg:'user not authorized'})
        }
        await post.remove()
        res.json({msg: 'post removed'})
    } catch (e) {
        console.error(e.message); 
        if(e.kind==='objectId'){
            return res.status(404).json({msg : 'post not found'})
        }  
        res.status(500).send('Server ERROR')
    }
  });
  //put api/post/like/:id
  router.put('/like/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has already been liked
      if (post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post already liked' });
      }
  
      post.likes.unshift({ user: req.user.id });
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

 // @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route POST api/post/comment/:id
// @desc create a post 
// @access Private
// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// delete api/post/comment/:id/:comment_id
// @desc delete comment
// @acces private
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
  try {
    const post =await Post.findById(req.params.id)
    //pull out comment
    const comment=post.comments.find(c=>c.id===req.params.comment_id);
    // make sure comment exists
    if(!comment){
      return res.status(400).json({msg :'comment does not exist'})
    }
    // check user
    if(comment.user.toString()!==req.user.id){
      return res.status(401).json({msg:'user not authorized'})
    }
    const removeIndex=post.comments
    .map(comment=>comment.user.toString())
    .indexOf(req.user.id);
    post.comments.splice(removeIndex,1);
    await post.save();
    res.json(post.comments)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


module.exports=router;