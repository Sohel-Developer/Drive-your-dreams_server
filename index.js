
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const app = express()
const port = process.env.PORT || 5000;
/* 
pass = pvkulRlEh0j7ODMB
user= drivingAdmin

*/

app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gooryv8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const services = client.db("drivingApp").collection("services");

        app.get('/services', async(req, res) => {

            const query = {};
            const result = services.find(query);
            const data = await result.toArray()
            res.send(data)
        })
    
    
        app.get('/service/:id', (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = {_id:ObjectId(id)}
            const service = services.findOne(query)
            console.log(service);
            res.send(service)
        })
    
    
    
    
    
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);





// const services = require('./data/service.json')

app.get('/', (req, res) => {
    res.send('Server Is Running dring your dreams')
})






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})