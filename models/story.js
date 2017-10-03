const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja Schema & model
const StorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    author: {
        type: String
    },
    content: {
        type: String,
        required: [true, 'Content field is required']
    },
    url: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    like: {
        type: Number,
        default: 0
    }
});

const Story = mongoose.model('story', StorySchema);

module.exports = Story;