const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category:  {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    username: {
        type: String
    },
    image: {
        type: String
    }

});

ImageSchema.index({
    '$**' : 'text'
});

module.exports = mongoose.model('Image', ImageSchema);