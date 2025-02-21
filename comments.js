// Create web server
// 1. npm install express
// 2. npm install body-parser
// 3. npm install mongodb
// 4. npm install mongoose
// 5. npm install cors
// 6. npm install nodemon

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const Comment = require('./models/Comment');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/comments');

app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.json(comment);
});

app.listen(3000, () => {
    console.log('Server started');
});
