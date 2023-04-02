const mongoose = require("mongoose");
const {Schema, model} = mongoose;
employeeSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    last_name: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Not_Set"],
      default: "Not_Set",
    },

    birthday: {
      type: Date,
      required: true,
      trim: true,
    },
    phone_number: {
      type: Number,
      required: true,
      validate: /^(\+98|0)?9\d{9}$/,
    },
    national_code: {
      required: true,
      unique: true,
      type: Number,
      validate: /^[0-9]{10}$/,
    },
  },
  {
    timestamps: true,
  }
);

module.exports=  model("EmployeeCollection",employeeSchema);
