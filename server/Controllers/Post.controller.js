import postModel from "../Models/Post.model.js"


const createPost = async (req, res, next) => {
    try {
        const { topic, question, answer } = req.body;
        const responseData = await postModel.create({
            topic,
            question,
            answer
        })
        res.send({
            success: true,
            responseData
        });
    } catch (error) {
        console.log(error);
    }
}
const getAllPosts = async (req, res, next) => {
    try {
        const responseData = await postModel.find();
        res.send({
            success: true,
            responseData
        });
    } catch (error) {
        console.log(error);
    }
}
const getSinglePost = async (req, res, next) => {
    try {
        const { postID } = req.query;
        const responseData = await postModel.findById(postID);
        res.send({
            success: true,
            responseData
        });
    } catch (error) {
        console.log(error);
    }
}
const deletePost = async (req, res, next) => {
    try {
        const { postID } = req.body;
        const responseData = await postModel.findByIdAndDelete(postID);
        res.send({
            success: true,
            responseData
        });
    } catch (error) {
        console.log(error)
    }
}
const updatePost = async (req, res, next) => {
    try {
        const { postID, topic, question, answer } = req.body;
        const responseData = await postModel.findByIdAndUpdate(postID, {
            topic,
            question,
            answer
        },{new:true});
        res.send({
            success: true,
            responseData
        });
    } catch (error) {
        console.log(error)
    }
}
export {
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    updatePost
}