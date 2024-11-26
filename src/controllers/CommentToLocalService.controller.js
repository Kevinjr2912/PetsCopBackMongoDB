const LocalService = require('../models/LocalService.model');

// Method to create a comment to a local or service
exports.createCommentToLocalOrService = async (req, res) => {
    const { id_local_service, id_user } = req.params;
    const { response, creation_date } = req.body;

    try {
        await LocalService.updateOne(
            { _id: id_local_service },
            { $push: { comments: { id_user: id_user, response: response, creation_date: creation_date } } } 
        );

        res.status(201).json({ message: 'Created comment' })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

// Method to update a user's comment to a local or service
exports.updateUserCommentOnLocalOrService = async (req, res) => {
    const { id_local_service, id_comment } = req.params;
    const { new_response, new_creation_date } = req.body;

    try {
        await LocalService.updateOne(
            { _id: id_local_service, "comments._id": id_comment },
            { $set: { "comments.$.response": new_response, "comments.$.creation_date": new_creation_date } }
        );

        res.status(200).json({ message: 'Updated user comment' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Method to delete a comment and its replies
exports.deleteCommentUserOnLocalOrService = async (req, res) => {
    const { id_local_service, id_comment } = req.params;

    try {
        await LocalService.updateOne(
            { _id: id_local_service },
            { $pull: { comments: { _id: id_comment } } }
        );

        res.status(200).json({ message: 'Comment deleted' });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

