const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGOLAB_URI || 'mongodb://localhost/storyfilm';

// connect to mongodb
mongoose.connect(URL);
mongoose.Promise = global.Promise;

app.use(express.static(path.resolve(__dirname, './client/build')));


app.use(bodyParser.json());
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});