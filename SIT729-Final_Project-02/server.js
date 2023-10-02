const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = 3000;

const mongoURL = "mongodb+srv://poornadeakin:GC5wUX8963JwpS4B@lights.gep6lrx.mongodb.net/?retryWrites=true&w=majority"; 

let db;

app.use(bodyParser.json());
app.use(express.static('public'));

async function connectToMongo() {
    try {
        const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
        console.log('Connected to Database');
        db = client.db('smart_lighting');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}


app.post('/addLights', (req, res) => {
    
    let mockLights = [];
    for (let i = 0; i < 100; i++) {
        mockLights.push({
            id: i,
            status: Math.random() > 0.5 ? 'on' : 'off',
            floor: Math.ceil(Math.random() * 10), 
            room: `Room ${Math.ceil(Math.random() * 10)}` 
        });
    }

    db.collection('lights').insertMany(mockLights, (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.send('Mock lights added successfully');
    });
});

app.get('/getLightsByFloor', (req, res) => {
    const { floor } = req.query;
    db.collection('lights').find({ floor: parseInt(floor) }).toArray((err, lights) => {
        if (err) return res.status(500).send(err.message);
        res.json(lights);
    });
});

app.get('/getLightsByRoom', (req, res) => {
    const { room } = req.query;
    db.collection('lights').find({ room }).toArray((err, lights) => {
        if (err) return res.status(500).send(err.message);
        res.json(lights);
    });
});

app.put('/toggleLight', (req, res) => {
    const { id } = req.query;
    db.collection('lights').findOne({ id: parseInt(id) }, (err, light) => {
        if (err) return res.status(500).send(err.message);
        if (!light) return res.status(404).send("Light not found");

        const newStatus = light.status === 'on' ? 'off' : 'on';
        db.collection('lights').updateOne({ id: parseInt(id) }, { $set: { status: newStatus } }, (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send(`Light with ID ${id} toggled successfully.`);
        });
    });
});

connectToMongo();
