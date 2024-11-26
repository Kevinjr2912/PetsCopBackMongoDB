const mongoose = require('mongoose');

const localServiceSchema = new mongoose.Schema({
    id_user: {
        type: Number,
        required: true
    },
    photo_profile: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: false
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
            colony: {
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
        required: false
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
            creation_date: {
                type: Date,
                required: true
            }
        }],
        required: false
    }
});

const LocalService = mongoose.model('LocalService', localServiceSchema);

module.exports = LocalService;
