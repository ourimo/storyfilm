const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja Schema & model
const StorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    content: {
        type: String,
        required: [true, 'Content field is required']
    }
});

const Story = mongoose.model('story', StorySchema);

module.exports = Story;