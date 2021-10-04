const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const ObjectId = require("mongodb").ObjectId;
const fsExtra = require("fs-extra")
const fileUpload = require("express-fileupload")
const port = process.env.PORT || 4000;
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload())

app.get("/", (req, res) => {
    res.send("connected")
})


const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qvvgh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("creativeAgency").collection("Services");
  const ordersCollection = client.db("creativeAgency").collection("Orders");
  const reviewsCollection = client.db("creativeAgency").collection("Reviews");
  const adminCollection = client.db("creativeAgency").collection("Admin");
  // post service with img
    
      app.post('/addService', (req, res) =>{
          const file = req.files.file;
          const title = req.body.title;
          const description = req.body.description;

          const newImg = file.data;//read local file
          const encriptedImg = newImg.toString('base64')//conver to base64

          const image = {
              contentType: file.mimetype,//imgType
              size: file.size,
              img: Buffer.from(encriptedImg, 'base64')
          }

          serviceCollection.insertOne({title, description, image})
            .then(result =>{
                res.send(result.acknowledged);
            })

      })

      //get service
      app.get('/getServices', (req, res) =>{
          serviceCollection.find()
            .toArray((err, result) =>{
                res.send(result)
            })
      })
    
      //post order with img
    app.post('/uploadOrder', (req, res) => {
        const file = req.files.file;
        const name = req.body.customerName;
        const email = req.body.customerEmail;
        const category = req.body.customerCategory;
        const description = req.body.customerDescription;
        const price = req.body.customerPrice;
        const status = req.body.status;
        console.log(status)

        const imgData = file.data;
        const incImg = imgData.toString('base64');

        const image = {
            contentType: file.mimetype,
            size: file.size,
            img: Buffer.from(incImg, 'base64')
        }

        ordersCollection.insertOne({name, email, status, category, description, price, image})
            .then( result => {
                res.send(result.acknowledged)
                console.log(result)
            })
    })

    //get total orders
    app.get('/getTotalOrders', (req, res) => {
        ordersCollection.find()
            .toArray((err, result) => {
                res.send(result)
            })
    })

    //get order by email
    app.get('/getUserOrders', (req, res) =>{
        ordersCollection.find({email: req.query.email})
            .toArray((err, result) => {
                res.send(result)
            })
    })

    //post review 
    app.post('/postReview', (req, res) => {
        const review = req.body;
        reviewsCollection.insertOne(review)
            .then( result => {
                res.send(result.acknowledged)
            })
    })
    //get review
    app.get('/getReview', (req, res) => {
        reviewsCollection.find()
            .toArray((err, result) => {
                res.send(result)
            })
    })
    //post admin 
    app.post('/addAdmin', (req, res) => {
        const adminEmail = req.body; 
        adminCollection.insertOne(adminEmail)
            .then(result => {
                res.send(result.acknowledged)
            })
    })
    //get admin
    app.post('/isAdmin', (req, res) => {
        adminCollection.find({email: req.body.email})
            .toArray((err, result) => {
                res.send(result.length > 0)
            })
    })
    //change status
    app.patch('/updateStatus/:id', (req, res) => {
        ordersCollection.updateOne(
            {_id: ObjectId(req.params.id)},
            {$set: {status: req.body.status}}
        ).then(result => {
            res.send(result.acknowledged)
            console.log(result)
        })
    })
    
});

app.listen(port, () => {
    console.log(`App listen at http://localhost:${port}`)
})