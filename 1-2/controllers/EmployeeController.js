const { query } = require("express");
const Employee = require("../models/employeeModel");
const createError = require("http-errors");
const mongoose= require("mongoose")
const path= require("path")
//GET all employees
const getAllEmployees= async (req,res,next)=>{
    try {
        const allEmployees =await Employee.find({},{"__v":0});
        res.send(allEmployees);
                
    } catch (error) {
        next(createError(500,`${error.message}`));
        
        
    }
}
//GET single employee
const getSingleEmployee= async(req,res,next)=>{
    try {
        const id= new mongoose.Types.ObjectId(req.body.id);
        const targetEmployee = await Employee.findOne(id);
        if(targetEmployee){
            res.send(targetEmployee);
        }
        
    } catch (error) {
        next(createError(500, `${error.message}`));
    }
}

//CREATE employee
const createEmployee = async (req, res, next) => {
  const newEmployee = new Employee({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    birthday: req.body.birthday,
    phone_number: req.body.phone_number,
    national_code: req.body.national_code,
    role: req.body.role,
    province: req.body.province,
    company: req.body.company,
  });
  newEmployee
    .save()
    .then((savedEmployee) => {
      return res.json(savedEmployee);
    })
    .catch((err) => {
      return next(createError(500, err.message));
    });
};
//UPDATE employee
const updateEmployee = async (req, res, next) => {
  try {
    const filter= req.body[0];
    const targetEmployee = await Employee.findOneAndUpdate(
      new mongoose.Types.ObjectId(filter),
      req.body[1], {new:true}
    );

    res.send(targetEmployee);

    
  } catch (error) {
    next(createEmployee(500, "an Error occured during saving data(update data)"));
  }
};

//DELETE employee
const deleteEmployee= async (req,res,next)=>{
   try {
     const id = new mongoose.Types.ObjectId(req.body.id);
     const deletedEmployee = await Employee.findByIdAndDelete(id, {
       new: true,
     });
     res.send(deletedEmployee);
    
   } catch (error) {
     next(createError(500, "an error occured during deleting data(delete employee)"))
   }
}

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getSingleEmployee,
};
