const client = require("../utils/dbConnect");

//post admin
const addNewAdmin = (req, res) => {
  const adminEmail = req.body;
  client.adminCollection.insertOne(adminEmail).then((result) => {
    res.send(result.acknowledged);
  });
};

//see isAdmin or not
const isAdmin = (req, res) => {
  client.adminCollection
    .find({ email: req.body.email })
    .toArray((err, result) => {
      res.send(result.length > 0);
    });
};

module.exports = {
  addNewAdmin,
  isAdmin,
};
