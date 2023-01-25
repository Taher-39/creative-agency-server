import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Provide Unique name for this service"],
      unique: [true, "Name must be unique"],
      trim: true,
      minLength: [3, "Length must 3-100 characters"],
      maxLength: [100, "Length must 3-100 characters"],
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
