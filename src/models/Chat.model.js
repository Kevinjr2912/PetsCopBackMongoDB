const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    id_user_1: {
        type: Number,
        required: true,
    },
    id_user_2: {
        type: Number,
        required: true,
    },
    messages: {
        type: [{
            id_user: {
                type: Number,
                required: true,
            },
            body_message: {
                type: String,
                required: false,
            },
            id_img: {
                type: String,
                required: false
            }
        }]
    }
})

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;