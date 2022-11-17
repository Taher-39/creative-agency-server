const { ObjectId } = require("mongodb");
const client = require("../utils/dbConnect");

//post order with img
const uploadOrder = (req, res) => {
  try {
    const { name, email, category, description, price, status, newAmount } =
      req.body;

    console.log(name, email, status, category, description, price);

    const file = req.files.file;
    const imgData = file.data;
    const incImg = imgData.toString("base64");

    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(incImg, "base64"),
    };

    client.ordersCollection
      .insertOne({ name, email, status, category, description, price, image })
      .then((result) => {
        res.send(result.acknowledged);

        client.userCollection.findOneAndUpdate(
          { email: email },
          { $set: { amount: newAmount } },
          { returnNewDocument: true }
        );
      });
  } catch (error) {
    res.send(error.message);
  }
};

//get total orders
const totalOrders = (req, res) => {
  client.ordersCollection.find().toArray((err, result) => {
    res.send(result);
  });
};

//get order by email
const singleOrder = (req, res) => {
  client.ordersCollection
    .find({ email: req.query.email })
    .toArray((err, result) => {
      res.send(result);
    });
};

//change order status

const changeStatus = (req, res) => {
  client.ordersCollection
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { status: req.body.status } }
    )
    .then((result) => {
      res.send(result.acknowledged);
    });
};

module.exports = {
  uploadOrder,
  totalOrders,
  singleOrder,
  changeStatus,
};
