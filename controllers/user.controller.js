const client = require("../utils/dbConnect");

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await client.userCollection.findOne({ email });

    if (user && user.password == password) {
      res.json({
        name: user.name,
        email: user.email,
        amount: user.amount,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    res.send(error.message);
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    client.userCollection.find({ email }).toArray((err, result) => {
      if (result[0]?.email == email) {
        res.status(400).send("User already exists");
      }
    });

    client.userCollection
      .insertOne({
        name,
        email,
        password,
        amount: 0,
        isAdmin: false,
      })
      .then((result) => {
        res.send({
          name,
          email,
        });
      });
  } catch (error) {
    res.send("Error found", error.message);
  }
};

module.exports = {
  registerUser,
  authUser,
};
