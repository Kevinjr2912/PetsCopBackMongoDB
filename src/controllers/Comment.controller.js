const Post = require('../models/Post.model');
const authenticateJWT = require('../middlewares/authenticateJWT');

// Method to create a comment to a post
exports.createCommentToPost = [authenticateJWT,async (req, res) => {
    const { id_post, id_user } = req.params;
    const { response, creation_date } = req.body;

    try {
        await Post.findByIdAndUpdate(id_post,
            { $push: { comments: { id_user: id_user, response: response, creation_date: creation_date  } } } 
        );

        res.status(201).json({ message: 'Created comment' });

    } catch (err) {
        res.status(500).json({ message: 'Server error ' });
    }
}]

// Method to update a user's comment to a post
exports.updateUserCommentOnPost = [authenticateJWT,async (req, res) => {
    const { id_post, id_comment } = req.params;
    const { new_response, new_creation_date } = req.body;

    try {
        await Post.updateOne(
            { _id: id_post, "comments._id": id_comment },
            { $set: { "comments.$.response": new_response, "comments.$.creation_date": new_creation_date } }
        );
        
        res.status(200).json({ message: 'Updated user comment' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}]

// Method to delete a comment and its replies
exports.deleteCommentUserOnPost = [authenticateJWT,async (req, res) => {
    const { id_post, id_comment } = req.params;

    try {
        await Post.updateOne(
            { _id: id_post },
            { $pull: { comments: { _id: id_comment } } }
        );

        res.status(200).json({ message: 'Comment deleted' });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}]



