const mongoose = require('mongoose');

const localServiceSchema = new mongoose.Schema({
    id_user: {
        type: Number,
        required: true
    },
    type: { type: String, enum: ['Local', 'Service'] },
    photos: {
        type: [String],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: {
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
        required: false
    },
    phone_number: {
        type: String,
        required: true
    },
    opening_hours: {
        type: [{
            day_care: {
                type: String,
                required: true
            },
            start_time: {
                type: String,
                required: true
            },
            end_time: {
                type: String,
                required: true
            }
        }],
        required: true
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
});

const LocalService = mongoose.model('LocalService', localServiceSchema);

module.exports = LocalService;
