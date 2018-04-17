const app = require('express')();
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const controller = require('./controller');

const port = process.env.PORT || 3000;
app.listen(
    port,
    () => console.log(`Server listening on port ${port}`),
);

app.use(body_parser.json());
app.use('/form', controller);

mongoose.connect(
    process.env.DB_URI,
    null,
    (err) => console.log(err || 'Successfully connected to db'),
);





