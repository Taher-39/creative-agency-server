import ObjectId from "mongodb";
import client from "../utils/dbConnect.js";

//post token from admin
export const CreateNewToken = (req, res) => {
  const { amount, token } = req.body;
  const tokenInfo = {
    amount,
    token,
    isValid: true,
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  };

  client.tokenCollection.insertOne(tokenInfo).then((result) => {
    res.send(result.acknowledged);
  });
};

//get total token from admin
export const FindValidToken = (req, res) => {
  client.tokenCollection.find().toArray((err, result) => {
    res.send(result);
  });
};

//add money in user account using token
// and change token isValid status
export const AddMoney = (req, res) => {
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
export const DeleteToken = (req, res) => {
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

//get single token
export const getSingleToken = (req, res) => {
  try {
    client.tokenCollection
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, result) => {
        res.send(result);
      });
  } catch (error) {
    res.send(error.message);
  }
};

//update token from admin
export const UpdateToken = (req, res) => {
  try {
    const { amount, token } = req.body;

    client.tokenCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { token, amount, updatedAt: new Date().toLocaleDateString() } }
      )
      .then((result) => {
        res.send(result.modifiedCount > 0);
      });
  } catch (error) {
    res.send(error.message);
  }
};
