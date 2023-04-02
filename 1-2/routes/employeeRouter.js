const express = require("express");
const router = express();
const {createEmployee} = require("../controllers/EmployeeController")

//routes
router.post("/",createEmployee)


module.exports= router;