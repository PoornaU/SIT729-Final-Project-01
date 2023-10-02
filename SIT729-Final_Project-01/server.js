const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = 3000;

// Replace with MongoDB Atlas connection string
const mongoURL = "mongodb+srv://poornadeakin:GC5wUX8963JwpS4B@lights.gep6lrx.mongodb.net/?retryWrites=true&w=majority"; 

let db;

app.use(bodyParser.json());
app.use(express.static('public'));

// Async function to connect to MongoDB
async function connectToMongo() {
    try {
        const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
        console.log('Connected to Database');
        db = client.db('smart_lighting');

        // Starting the server inside ensures it doesn't start unless the MongoDB connection is successful
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

// Endpoint to add mock data to MongoDB
app.post('/addLights', (req, res) => {
    const lights = req.body;
    db.collection('lights').insertMany(lights, (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.send('Lights added successfully');
    });
});

// Initiate MongoDB connection
connectToMongo();
