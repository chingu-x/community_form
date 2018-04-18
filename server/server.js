const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const controller = require('./controller');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// load environment variables
dotenv.config(); // defaults to parsing the top-level .env file

const port = process.env.PORT || 3000;
const app = express();
app.listen(
    port,
    () => console.log(`Server listening on port ${port}`),
);

app.use(body_parser.json());
app.use(express.static('public'));
app.use('/form', cors(), controller);

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

mongoose.connect(
    process.env.DB_URI,
    null,
    (err) => console.log(err || 'Successfully connected to db'),
);





