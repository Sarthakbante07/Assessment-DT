const express = require('express');
const bodyParser = require('body-parser');
const getEvent = require('./Routes/getEvent');
const postEvent = require('./Routes/postEvent');
const putEvent = require('./Routes/putEvent');
const deleteEvent = require('./Routes/deleteEvent');
const { connectDB } = require('./utils/db');  // Import connectDB function

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB()
    .then(() => {
        // Use routes after DB connection is established
        app.use('/api/v3/app', getEvent);
        app.use('/api/v3/app', postEvent);
        app.use('/api/v3/app', putEvent);
        app.use('/api/v3/app', deleteEvent);

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });
