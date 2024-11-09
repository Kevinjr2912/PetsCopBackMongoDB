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

    try {
        let pet_adotion = new Post({ id_user, post_type, basic_pet_information, medical_data, publication_date });

        await pet_adotion.save();

        res.status(201).json({ message: "Post created from a pet for adoption" });
    } catch (err) {
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
        res.status(500).json({ message: 'Error del servidor' });
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
        res.status(500).json({ message: 'Error del servidor' });
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
    const { searchParam } = req.body;

    try{
        let results = [];

        if(!searchParam)
            res.status(404).json({message: "Missing fields"});

        results = await Post.find({"loss_data.description" : new RegExp(searchParam, 'i')});

        res.status(200).json(results);
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}
