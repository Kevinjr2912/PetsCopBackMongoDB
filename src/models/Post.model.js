const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id_user: {
        type: Number,
        required: true
    },
    post_type: { type: String, enum: ['Adoption', 'Lost', 'Found'] },
    basic_pet_information: {
        type: {
            type_pet: {
                type: String, enum: ['Dog', 'Cat', 'Bird'],
                required: true
            },
            name: {
                type: String,
                required: true
            },
            race: {
                type: String,
                required: false
            },
            age: {
                type: String,
                required: true
            },
            sex: {
                type: String, enum: ['Male', 'Female'],
                required: true
            },
            main_physical_characteristics: {
                type: [String],
                required: true
            },
            photos: {
                type: [String],
                required: true
            }
        },
        required: true
    },
    loss_data: {
        type: {
            address: {
                zip_code: {
                    type: Number,
                    required: true
                },
                state: {
                    type: String,
                    required: true
                },
                municipality: {
                    type: String,
                    required: true
                },
                cologne: {
                    type: String,
                    required: true
                },
                outside_number: {
                    type: Number,
                    required: false
                },
                street: {
                    type: String,
                    required: true
                }
            },
            loss_date: {
                type: Date,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            last_seen: {
                type: String,
                required: false
            }
        },
        required: false
    },
    reward: {
        type: Number,
        required: false
    },
    gratitude: {
        type: String,
        required: false
    },
    medical_data: {
        type: {
            has_vaccines: {
                type: Boolean,
                required: true
            },
            primer: {
                type: String,
                required: false
            },
            has_physical_problems: {
                type: Boolean,
                required: true
            },
            physical_problems: {
                type: [String],
                required: false
            },
            has_operations: {
                type: Boolean,
                required: true
            },
            operations: {
                type: [String],
                required: false
            }
        },
        required: false
    },
    comments: {
        type: [{
            id_user: {
                type: Number,
                ref: 'User',
                required: true
            },
            response: {
                type: String,
                required: true
            },
            replies: [
                {
                    id_user: {
                        type: Number,
                        required: true
                    },
                    response: {
                        type: String,
                        required: true
                    }
                }
            ]
        }],
        required: false
    }
    ,
    publication_date: {
        type: Date,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
