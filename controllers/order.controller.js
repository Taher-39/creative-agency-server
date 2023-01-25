import ObjectId from "mongodb";
import client from "../utils/dbConnect.js";

//post order with img
export const uploadOrder = (req, res) => {
  try {
    const { name, email, category, description, price, status, newAmount } =
      req.body;

    const file = req.files.file;
    const imgData = file.data;
    const incImg = imgData.toString("base64");

    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(incImg, "base64"),
    };

    const date = new Date().toLocaleDateString();

    client.ordersCollection
      .insertOne({
        name,
        email,
        status,
        category,
        description,
        price,
        image,
        date,
      })
      .then((result) => {
        res.send(result.acknowledged);

        client.userCollection.findOneAndUpdate(
          { email: email },
          { $set: { amount: Number(newAmount) } },
          { returnNewDocument: true }
        );
      });
  } catch (error) {
    res.send(error.message);
  }
};

//get total orders
export const totalOrders = (req, res) => {
  client.ordersCollection.find().toArray((err, result) => {
    res.send(result);
  });
};

//get order by email
export const singleOrder = (req, res) => {
  client.ordersCollection
    .find({ email: req.query.email })
    .toArray((err, result) => {
      res.send(result);
    });
};

//change order status

export const changeStatus = (req, res) => {
  client.ordersCollection
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { status: req.body.status } }
    )
    .then((result) => {
      res.send(result.acknowledged);
    });
};
