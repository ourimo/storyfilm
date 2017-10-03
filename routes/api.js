const express = require ('express');
const router = express.Router();

const Story = require('../models/story');

// get a list of stories from the db
router.get('/stories', function(req, res, next){
    Story.find({})
        .sort({createdAt: 'desc'})
        .then(function(stories){
            res.send(stories);
    });
});

// add a new story to the db
router.post('/stories', function(req, res, next){
    Story.create(req.body).then(function(story){
        res.send(story);
    }).catch(next);
});

// update a story in the db
router.put('/stories/:id', function(req, res, next){
    Story.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Story.findOne({_id: req.params.id}).then(function(story){
            res.send(story);
        });
    }).catch(next);
});

// delete a story from the db
router.delete('/stories/:id', function(req, res, next){
    Story.findByIdAndRemove({_id: req.params.id}).then(function(story){
        res.send(story);
    }).catch(next);
});

module.exports = router;