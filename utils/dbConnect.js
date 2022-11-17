require("dotenv").config();

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qvvgh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  module.exports.serviceCollection = client.db("creativeAgency").collection("Services");
  module.exports.ordersCollection = client.db("creativeAgency").collection("Orders");
  module.exports.reviewsCollection = client.db("creativeAgency").collection("Reviews");
  module.exports.adminCollection = client.db("creativeAgency").collection("Admin");
  module.exports.tokenCollection = client.db("creativeAgency").collection("Tokens");
  module.exports.userCollection = client.db("creativeAgency").collection("Users");
});

module.exports = client;
