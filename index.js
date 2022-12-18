const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3drcjwz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// Async Function
async function run() {
    try {
        // Database & Collection
        const serviceCollection = client.db('MilestoneTravelsDatabase').collection('Services');
        const ordersCollection = client.db('MilestoneTravelsDatabase').collection('Orders');
        const reviewCollection = client.db('MilestoneTravelsDatabase').collection('Reviews');
        const blogCollection = client.db('MilestoneTravelsDatabase').collection('Blogs');
        // Get Sevices From Database
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        // Get Three Sevices From Database
        app.get('/home/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        });
        // Get One Service From Database
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });
        // Send Order To The Database
        // app.post('/orders', async (req, res) => {
        //     const order = req.body;
        //     const result = await ordersCollection.insertOne(order);
        //     res.send(result);
        // });
        // Get Orders For A Perticular Email
        // app.get('/orders', async (req, res) => {
        //     const email = req.query.email;
        //     const query = { email: email };
        //     const cursor = ordersCollection.find(query);
        //     const placedOrders = await cursor.toArray();
        //     res.send(placedOrders);
        // });
        // Delete Order From Database
        // app.delete('/orders/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await ordersCollection.deleteOne(query);
        //     res.send(result);
        // });
        //Modify A Order
        // app.patch('/orders/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const status = req.body.status;
        //     const query = { _id: ObjectId(id) };
        //     const updatedDoc = {
        //         $set: {
        //             status: status
        //         }
        //     }
        //     const result = await ordersCollection.updateOne(query, updatedDoc);
        //     res.send(result);
        // });
        // Send Review To The Database
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });
        // Get Review From Database By Service Id For A Service
        app.get('/reviews', async (req, res) => {
            const serviceId = req.query.serviceId;
            const query = { serviceId: serviceId };
            const cursor = reviewCollection.find(query);
            const addedReviews = await cursor.toArray();
            res.send(addedReviews);
        });
        // Get Review From Database By Email For A User
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = ordersCollection.find(query);
            const placedOrders = await cursor.toArray();
            res.send(placedOrders);
        });
        // Get Blogs From Database
        app.get('/blogs', async (req, res) => {
            const query = {};
            const cursor = blogCollection.find(query);
            const blogs = await cursor.toArray();
            res.send(blogs);
        });
        // Get One Blog From Database
        app.get('/blogs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const blogs = await blogCollection.findOne(query);
            res.send(blogs);
        });
    }
    finally { }
};
run().catch(error => console.error(error));



// Get Method Check
app.get('/', (req, res) => {
    res.send('Milestone Travels Server Is Running');
});

// Listen Method Check
app.listen(port, () => {
    console.log(`Milestone Travels Server Is Running On Port ${port}`);
});