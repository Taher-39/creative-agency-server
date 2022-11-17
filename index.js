const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fsExtra = require("fs-extra");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const port = process.env.PORT || 4000;

const serviceRoute = require("./routes/v1/service.routes.js");
const orderRoute = require("./routes/v1/order.routes");
const reviewRoute = require("./routes/v1/review.routes");
const adminRoute = require("./routes/v1/admin.routes.js");
const tokenRoute = require("./routes/v1/token.routes.js");
const userRoute = require("./routes/v1/user.routes.js");

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("connected");
});

app.use("/api/v1", serviceRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", reviewRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", tokenRoute);
app.use("/api/v1", userRoute);

app.all("*", (req, res) => {
  res.send("Route not found.");
});

app.listen(port, () => {
  console.log(`App listen at http://localhost:${port}`);
});
