const Post = require('../models/Post.model');

// Method for creating a post for a lost pet
exports.createPostForLostPet = async (req, res) => {
    const { id_user, post_type, basic_pet_information, loss_data, reward, publication_date } = req.body;

    console.log("Fotos ", basic_pet_information.photos)

    try {
        let lost_pet_post = '';

        if (reward !== '') {
            lost_pet_post = new Post({ id_user, post_type, basic_pet_information, loss_data, reward, publication_date });
        } else {
            lost_pet_post = new Post({ id_user, post_type, basic_pet_information, loss_data, publication_date });
        }

        await lost_pet_post.save();

        res.status(201).json({ message: "Post created from a lost pet" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' });
    }
}

// Method for creating post for pets for adoption
exports.createPostForPetAdoption = async (req, res) => {
    const { id_user, post_type, basic_pet_information, medical_data, publication_date } = req.body;

    try {
        let pet_adotion = new Post({ id_user, post_type, basic_pet_information, medical_data, publication_date });

        await pet_adotion.save();

        res.status(201).json({ message: "Post created from a pet for adoption" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

// Method to get the most recent post types
exports.getRecentPosts = async (req, res) => {
    try {
        let projectFields = {
            _id: 1,
            id_user: 1,
            post_type: 1,
            'basic_pet_information.name': 1,
            'basic_pet_information.type': 1,
            'basic_pet_information.photos': 1,
            'publication_date': 1
        }

        const posts = await Post.aggregate([
            { $project: projectFields },
            { $sort: { publication_date: - 1 } }
        ])

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Method to get oldest post types
exports.getOldPosts = async (req, res) => {
    try {
        let projectFields = {
            _id: 1,
            id_user: 1,
            post_type: 1,
            'basic_pet_information.name': 1,
            'basic_pet_information.type': 1,
            'basic_pet_information.photos': 1,
            'publication_date': 1
        }

        const posts = await Post.aggregate([
            { $project: projectFields },
            { $sort: { publication_date: 1 } }
        ]);

        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Method to get recent posts according to a post type
exports.getRecentPostsType = async (req, res) => {
    const { post_type } = req.params;

    try {
        let projectFields = {
            _id: 1,
            id_user: 1,
            'basic_pet_information.name': 1,
            'basic_pet_information.type': 1,
            'basic_pet_information.photos': 1,
            'publication_date': 1
        };

        if (post_type === 'Perdido') {
            projectFields['loss_data.address.municipality'] = 1;
            projectFields['loss_data.description'] = 1;
        } else if (post_type === 'Adopción') {
            projectFields['basic_pet_information.main_physical_characteristics'] = 1;
        } else {
            projectFields['gratitude'] = 1;
        }

        const posts = await Post.aggregate([
            { $match: { post_type } },
            { $project: projectFields },
            { $sort: { publication_date: -1 } }
        ]);

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Method to get old posts according to a post type
exports.getOldPostsType = async (req, res) => {
    const { post_type } = req.params;

    try {
        let projectFields = {
            _id: 1,
            id_user: 1,
            'basic_pet_information.name': 1,
            'basic_pet_information.type': 1,
            'basic_pet_information.photos': 1,
            'publication_date': 1
        };

        if (post_type === 'Perdido') {
            projectFields['loss_data.address.municipality'] = 1;
            projectFields['loss_data.description'] = 1;
        } else if (post_type === 'Adopción') {
            projectFields['basic_pet_information.main_physical_characteristics'] = 1;
        } else {
            projectFields['gratitude'] = 1;
        }

        const posts = await Post.aggregate([
            { $match: { post_type } },
            { $project: projectFields },
            { $sort: { publication_date: 1 } }
        ]);

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Method to get the posts of a user
exports.getPostByIdUser = async (req, res) => {
    const { id_user } = req.params;

    try {
        const userId = parseInt(id_user);
        const results = await Post.aggregate([
            { $match: { id_user: userId } },
            { $sort: { publication_date: - 1 } }
        ]);

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Method to search post by pet name
exports.searchPosts = async (req, res) => {
    const { search_post } = req.body;

    try {

        const results = await Post.find({ 'basic_pet_information.name': { $regex: search_post, $options: 'i' } })

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Method to update the status and body of a post from a lost to found pet
exports.updateLostPetPostUpdateFound = async (req, res) => {
    const { id_post: filter } = req.params;
    const { gratitude } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(filter,
            {
                $set: {
                    post_type: 'Encontrado',
                    gratitude: gratitude
                },
                $unset: {
                    loss_data: ""
                }
            },
            { new: true }
        );

        res.status(200).json({ message: "Updated recipe", updatedPost })
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }

}

// Method to update the information of a post
exports.updateInformationPost = async (req, res) => {
    const { id_post } = req.params;
    const update_object = req.body;

    try {
        const updatedPost = await Post.findOneAndUpdate(
            { _id: id_post },
            { $set: update_object },
            { new: true }
        );

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

}

// Method to delete a post
exports.deletePostOfAUser = async (req, res) => {
    const { id_post: _id } = req.params;

    try {
        await Post.findByIdAndDelete(_id);

        res.status(200).json({ message: 'Deleted post' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

