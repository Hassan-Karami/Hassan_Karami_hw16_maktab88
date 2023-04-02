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
    phone_number: [
      { type: String, required: true, validate: /^(\+98|0)?9\d{9}$/ },
    ],
    national_code: {
      required: true,
      unique: true,
      type: String,
      validate: /^[0-9]{10}$/,
    },
    province: {
      type: String,
      enum: [
        "Alborz",
        "Ardabil",
        "Bushehr",
        "Chaharmahal and Bakhtiari",
        "East Azerbaijan",
        "Isfahan",
        "Fars",
        "Gilan",
        "Golestan",
        "Hamedan",
        "Hormozgan",
        "Ilam",
        "Kerman",
        "Kermanshah",
        "Khuzestan",
        "Kohgiluyeh and Boyer-Ahmad",
        "Kurdistan",
        "Lorestan",
        "Markazi",
        "Mazandaran",
        "North Khorasan",
        "Qazvin",
        "Qom",
        "Razavi Khorasan",
        "Semnan",
        "Sistan and Baluchestan",
        "South Khorasan",
        "Tehran",
        "West Azerbaijan",
        "Yazd",
        "Zanjan",
        "Not_Set",
      ],
      default: "Not_Set",
    },
    company: {
      type: String,
      required: true,
      min: 2,
      max: 40,
    },
    role: {
      type:String,
      enum: ["Employee", "Manager"],
      default: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

module.exports=  model("Employee",employeeSchema);
