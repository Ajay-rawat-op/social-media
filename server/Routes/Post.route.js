import express from 'express';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../Controllers/Post.controller.js';
const router = express.Router();


router.get("/",(req,res)=>{
    // res.send("hello ajay sir!")
    res.status(200).json({status:"ok",Message:"successfully running server!"})
})
router.post("/createPost",createPost)
router.get("/getAllPosts",getAllPosts)
router.get("/getSinglePost",getSinglePost)
router.delete("/deletePost",deletePost)
router.put("/updatePost",updatePost)

export default router