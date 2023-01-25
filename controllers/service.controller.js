import Service from "../models/serviceModel.js";

export const addService = async (req, res) => {
  try {
    console.log(req.file);
    const service = new Service(req.body);

    const result = await service.save();

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getServices = (req, res, next) => {
  client.serviceCollection.find().toArray((err, result) => {
    res.send(result);
  });
};

//get single services
export const getSingleService = (req, res) => {
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

export const deleteService = (req, res, next) => {
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
export const editService = (req, res, next) => {
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
