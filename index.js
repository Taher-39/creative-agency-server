import express from "express";
import cors from "cors";
import colors from "colors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";
import serviceRoute from "./routes/v1/service.routes.js";
import orderRoute from "./routes/v1/order.routes.js";
import reviewRoute from "./routes/v1/review.routes.js";
import adminRoute from "./routes/v1/admin.routes.js";
import tokenRoute from "./routes/v1/token.routes.js";
import userRoute from "./routes/v1/user.routes.js";
dotenv.config();

//db connect
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(`DB connectted`.blue.bold);
});

//file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("connected");
});

app.use("/api/v1", upload.single("image"), serviceRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", reviewRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", tokenRoute);
app.use("/api/v1", userRoute);

app.all("*", (req, res) => {
  res.send("Route not found.");
});

app.listen(port, () => {
  console.log(`App listen at http://localhost:${port}`.green.bold);
});
