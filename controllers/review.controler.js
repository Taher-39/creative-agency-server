import client from "../utils/dbConnect.js";

//post review
export const postReview = (req, res) => {
  const review = req.body;
  client.reviewsCollection.insertOne(review).then((result) => {
    res.send(result.acknowledged);
  });
};

//get review
export const getReview = (req, res) => {
  client.reviewsCollection.find().toArray((err, result) => {
    res.send(result);
  });
};

//see isClient or not
export const isClient = (req, res) => {
  client.ordersCollection
    .find({ email: req.body.email })
    .toArray((err, result) => {
      res.send(result.length > 0);
    });
};
