const EmployeeCollection = require("../models/employeeModel");
const createError = require("http-errors");
const createEmployee= (req,res,next)=>{
    const newEmployee = new EmployeeCollection({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      birthday: req.body.birthday,
      phone_number: req.body.phone_number,
      national_code: req.body.national_code,
    });
    newEmployee.save().
    then(savedEmployee => {
        return res.json(savedEmployee);
    })
    .catch(err => {
        return next(createError(500, err.message));
    });

}


module.exports= {createEmployee}