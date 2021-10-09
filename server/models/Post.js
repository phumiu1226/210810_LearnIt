const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED'], //status chi dc phep 3 dang : to learn , learning, learned
    },
    user: {
        type: Schema.Types.ObjectId, //ket noi vs Schema User
        ref: 'users'
    }
});

module.exports = mongoose.model('posts', PostSchema);