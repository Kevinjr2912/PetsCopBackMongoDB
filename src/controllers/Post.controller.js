const Post = require('../models/Post.model');

// Method for creating a post for a lost pet
exports.createPostForLostPet = async (req, res) => {
    const { id_user, post_type, basic_pet_information, loss_data, reward, publication_date } = req.body;

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
        res.status(500).json({ message: 'Server error' });
    }
}

// Method for creating post for pets for adoption
exports.createPostForPetAdoption = async (req, res) => {
    const { id_user, post_type, basic_pet_information, medical_data, publication_date } = req.body;

    console.log(req.body)

    try {
        let pet_adotion = new Post({ id_user, post_type, basic_pet_information, medical_data, publication_date });

        await pet_adotion.save();

        res.status(201).json({ message: "Post created from a pet for adoption" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' });
    }
}

// Method to get the most recent post types
exports.getRecentPosts = async (req, res) => {
    try {
        const posts = await Post.aggregate([{ $sort: { publication_date: - 1 } }])

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Method to get oldest post types
exports.getOldPosts = async (req, res) => {
    try {
        const posts = await Post.aggregate([{ $sort: { publication_date: 1 } }]);

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

exports.getPostByIdUser = async (req, res) => {
    const { id_user } = req.params;

    try {
        const userId = parseInt(id_user);
        const results = await Post.aggregate([
            { $match : { id_user: userId } },
            { $sort: { publication_date: - 1 } }
        ]);

        res.status(200).json(results);
    } catch(err) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.searchPosts = async (req, res) => {
    const { search_post } = req.body;

    try{
 
        const results = await Post.find({ 'basic_pet_information.name': { $regex: search_post, $options: 'i' } })                                                                                                                        

        res.status(200).json(results);
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}

exports.updateLostPetPostUpdateFound = async (req, res) => {
    const { id_post : filter } = req.params;
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

        res.status(200).json({ message: "Updated recipe", updatedPost})
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

}
