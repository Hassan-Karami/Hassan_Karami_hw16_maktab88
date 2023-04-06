const createError = require("http-errors");
const Employee = require("../models/employeeModel");
const genderValidateInputs = ["Male", "Female", "Not_Set"];
const provinceValidateInputs = [
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
];
const allInputs = [
  "first_name",
  "last_name",
  "gender",
  "birthday",
  "province",
  "company",
  "role",
  "national_code",
  "phone_number",
];
const roleValidateInputs = ["Employee", "Manager"];

//CreateEmployee  Validation
const createEmployeeValidation = async (req, res, next) => {
  try {
    //required empty fields handle
    if (!req.body.first_name) {
      return next(createError(400, "first_name is required!"));
    }
    if (!req.body.last_name) {
      return next(createError(400, "last_name is required!"));
    }
    if (!req.body.birthday) {
      return next(createError(400, "birthday is required!"));
    }
    if (!req.body.company) {
      return next(createError(400, "company is required!"));
    }
    if (!req.body.phone_number) {
      return next(createError(400, "phone_number is required!"));
    }
    if (!req.body.national_code) {
      return next(createError(400, "national_code is required!"));
    }
    //optional empty fields handling
    if (!req.body.gender) {
      req.body.gender = "Not_Set";
    }
    if (!req.body.province) {
      req.body.province = "Not_Set";
    }
    if (!req.body.role) {
      req.body.role = "Employee";
    }
    //length validation
    if (req.body.first_name.length < 3 || req.body.first_name.length > 40) {
      return next(
        createError(400, "first_name length must be between 3 and 40")
      );
    }
    if (req.body.last_name.length < 3 || req.body.last_name.length > 40) {
      return next(
        createError(400, "last_name length must be between 3 and 40")
      );
    }
    if (req.body.national_code.length !== 10) {
      return next(createError(400, "national_code length must be 10 digits!"));
    }
    //enum fields
    if (!genderValidateInputs.includes(req.body.gender)) {
      return next(createError(400, "invalid gender!"));
    }
    if (!provinceValidateInputs.includes(req.body.province)) {
      return next(createError(400, "invalid province!"));
    }
    if (!roleValidateInputs.includes(req.body.role)) {
      return next(createError(400, "invalid role!"));
    }
    //duplicate national_code
    const duplicate = await Employee.findOne({
      national_code: req.body.national_code,
    });
    if (!!duplicate)
      return next(createError(400, "this national_code already exist!"));
    //Date type validation for birthday
    const input = new Date(req.body.birthday);
    if (input == "Invalid Date") {
      return next(createError(400, "birthday input is not a valid Date type"));
    }
    //String Type validation
    if (typeof req.body.first_name !== "string") {
      return next(createError(400, "first_name must be string"));
    }
    if (typeof req.body.last_name !== "string") {
      return next(createError(400, "last_name must be string"));
    }
    if (typeof req.body.province !== "string") {
      return next(createError(400, "provice must be string"));
    }
    if (typeof req.body.company !== "string") {
      return next(createError(400, "company must be string"));
    }
    if (typeof req.body.role !== "string") {
      return next(createError(400, "role must be string"));
    }
    if (typeof req.body.gender !== "string") {
      return next(createError(400, "gender must be string"));
    }
    if (typeof req.body.national_code !== "string") {
      return next(createError(400, "national_code must be string"));
    }

    //phone-number type
    if (!(req.body.phone_number instanceof Array)) {
      return next(
        createError(400, "phone_number(s) container must be in Array type!")
      );
    }
    if (req.body.phone_number.length === 0) {
      return next(createError(400, "Empty Array for phone_number"));
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

//UpdateEmployee Validation
const updateEmployeeValidation = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(createError(400, "empty body is invalid!"));
    }
    if (Object.keys(req.body).length > allInputs.length) {
      return next(
        createError(
          400,
          "The number of sent fields is more than the allowed amount"
        )
      );
    }
    //type object
    if (typeof req.body !== "object" || Array.isArray(req.body)) {
      return next(createError(400, "type of body must object"));
    }
    //empty object
    if (Object.keys(req.body).length === 0) {
      return next(createError(400, "data body is empty"));
    }
    //not allowed fields
    let notValidSentFields = [];
    Object.keys(req.body).forEach((property) => {
      if (!allInputs.includes(property)) {
        notValidSentFields.push(property);
      }
    });
    if (notValidSentFields.length !== 0 && notValidSentFields.length === 1) {
      return next(
        createError(400, `[${notValidSentFields.join(",")}] is not valid!`)
      );
    }
    if (notValidSentFields.length > 1) {
      return next(
        createError(400, `[${notValidSentFields.join(",")}] is not valid!`)
      );
    }

    //enum fields
    if (!genderValidateInputs.includes(req.body.gender)) {
      return next(createError(400, "invalid gender!"));
    }
    if (!provinceValidateInputs.includes(req.body.province)) {
      return next(createError(400, "invalid province!"));
    }
    if (!roleValidateInputs.includes(req.body.role)) {
      return next(createError(400, "invalid role!"));
    }

    //empty values or space values

    if (
      Object.keys(req.body).find(
        (property) => String(req.body[property])?.trim() === ""
      )
    ) {
      return next(createError(400, "empty fileds are not valid"));
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createEmployeeValidation, updateEmployeeValidation };
