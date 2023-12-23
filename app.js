const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://saurabh:sagrsh@cluster0.chvjyfn.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err.message));

const Schema = new mongoose.Schema({
    listData: String
});

const Fetch = mongoose.model('Fetch', Schema);

app.get('/', (req, res) => {
    res.send('Root directory');
});

app.post('/add', (req, res) => {
    const fetchData = new Fetch({
        listData: req.body.listData
    });

    fetchData.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
});

app.get('/fetch', (req, res) => {
    Fetch.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
});

app.listen(port, () => {
    console.log(`server app  listening on port ${port}`);
});
