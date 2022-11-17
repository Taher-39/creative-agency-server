const { ObjectId } = require("mongodb");
const client = require("../utils/dbConnect");

module.exports.addService = (req, res, next) => {
  try {
    const { title, description } = req.body;

    const file = req.files.file;
    const imgData = file.data;
    const incImg = imgData.toString("base64");

    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(incImg, "base64"),
    };

    client.serviceCollection
      .insertOne({ title, description, image })
      .then((result) => {
        res.send(result.acknowledged);
      });
  } catch (error) {
    res.status(400).send("Service not upload");
  }
};

module.exports.getServices = (req, res, next) => {
  client.serviceCollection.find().toArray((err, result) => {
    res.send(result);
  });
};

//get single services
module.exports.getSingleService = (req, res) => {
  try {
    client.serviceCollection
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, result) => {
        res.send(result);
      });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.deleteService = (req, res, next) => {
  try {
    client.serviceCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.send(result.acknowledged);
      });
  } catch (error) {
    res.send(error.message);
  }
};
module.exports.editService = (req, res, next) => {
  try {
    const { title, description, image } = req.body;
    client.serviceCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { title, description, image } }
      )
      .then((result) => {
        res.send({
          result,
          data: req.body,
        });
      });
  } catch (error) {
    res.send(error.message);
  }
};
