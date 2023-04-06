const express = require("express");
const router = express();
const {createEmployee,updateEmployee} = require("../controllers/EmployeeController")
const {createEmployeeValidation,updateEmployeeValidation} = require("../validation/employeeValidation")

//routes
router.post("/",createEmployeeValidation,createEmployee);
router.put("/",updateEmployeeValidation,updateEmployee)


module.exports= router;