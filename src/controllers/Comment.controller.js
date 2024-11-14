const Post = require('../models/Post.model');
const authenticateJWT = require('../middleWare/authenticateJWT');

// Method to create a comment to a post
exports.createCommentToPost = async (req, res) => {
    const { id_post, id_user } = req.params;
    const { response } = req.body;

    try {
        await Post.findByIdAndUpdate(id_post,
            { $push: { comments: { id_user: id_user, response: response } } } 
        );

        res.status(201).json({ message: 'Created comment' })

    } catch (err) {
        res.status(500).json({ message: 'Server error ' })
    }
}

// Method to create a reply to a user's comment within the post
exports.createReplyToUSerComment = async (req, res) => {
    const { id_post, id_comment, id_user } = req.params;
    const { response } = req.body;

    try {
        await Post.updateOne(
            { _id: id_post, "comments._id": id_comment },
            { $push: { "comments.$.replies": { id_user: id_user, response: response } } }
        );

        res.status(200).json({ message: 'Created response' })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

}

// Method to update a user's comment to a post
exports.updateUserCommentOnPost = async (req, res) => {
    const { id_post, id_comment } = req.params;
    const { new_response } = req.body;

    try {
        await Post.updateOne(
            { _id: id_post, "comments._id": id_comment },
            { $set: { "comments.$.response": new_response } }
        );

        res.status(200).json({ message: 'Updated user comment' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Method to update a reply to a user comment
exports.updateReplyUserComment = async (req, res) => {
    const { id_post, id_comment, id_response_comment } = req.params;
    const { new_response_comment } = req.body;

    try {
        await Post.updateOne(
            { _id: id_post, "comments._id": id_comment, "comments.replies._id": id_response_comment },
            { $set: { "comments.$[comment].replies.$[reply].response": new_response_comment } },
            { arrayFilters: [{ "comment._id": id_comment }, { "reply._id": id_response_comment }] }
        );

        res.status(200).json({ message: 'Reply updated' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Method to delete a comment and its replies
exports.deleteCommentUserOnPost = async (req, res) => {
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
}

// Method to delete a reply to a comment
exports.deleteReplyComment = async (req, res) => {
    const { id_post, id_comment, id_response_comment } = req.params;

    try {
        await Post.updateOne(
            { _id: id_post, "comments._id": id_comment },
            { $pull: { "comments.$.replies": { _id: id_response_comment } } }
        );

        res.status(200).json({ message: 'Reply deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


