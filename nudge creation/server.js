const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');

const createNudge = require('./routes/createNudge');
const getNudge = require('./routes/getNudge');
const updateNudge = require('./routes/updateNudge');
const deleteNudge = require('./routes/deleteNudge');
const uploadImage = require('./routes/uploadImage');


const app = express()
const port = 3000

connectDB();

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api', createNudge);
app.use('/api', getNudge);
app.use('/api', updateNudge);
app.use('/api', deleteNudge);
app.use('/api', uploadImage);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))