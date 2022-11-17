const { ObjectId } = require("mongodb");
const client = require("../utils/dbConnect");

//post token from admin
const CreateNewToken = (req, res) => {
  const { amount, token } = req.body;
  const tokenInfo = {
    amount,
    token,
    isValid: true,
    createdAt: new Date().toLocaleString(),
  };

  client.tokenCollection.insertOne(tokenInfo).then((result) => {
    res.send(result.acknowledged);
  });
};

//get total valid token from admin
const FindValidToken = (req, res) => {
  client.tokenCollection.find().toArray((err, result) => {
    res.send(result);
  });
};

//add money in user account using token
// and change token isValid status
const AddMoney = (req, res) => {
  try {
    const { token, email } = req.body;

    client.tokenCollection.findOne({ token: token }, function (err, result) {
      const tokenAmount = Number(result?.amount);
      const isTokenValid = result?.isValid;

      if (isTokenValid) {
        client.userCollection.findOneAndUpdate(
          { email: email },
          { $inc: { amount: +tokenAmount } },
          { returnNewDocument: true }
        );
        client.tokenCollection.findOneAndUpdate(
          { token: token },
          { $set: { isValid: false } },
          { returnNewDocument: true }
        );

        res.send(result);
      } else {
        res.send("Token Is Already Used");
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};

// delete token from admin
const DeleteToken = (req, res) => {
  try {
    client.tokenCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.send(result.acknowledged);
      });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  CreateNewToken,
  FindValidToken,
  AddMoney,
  DeleteToken,
};
