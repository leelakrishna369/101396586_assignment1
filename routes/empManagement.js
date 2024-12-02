const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee'); 


router.get('/employees', async (req, res) => {

    try{
        const employees = await Employee.find() 
        if(!employees) return res.status(200).json({message : "No Employees"})
        res.status(200).json(employees); 
    } catch(error){
        res.status(500).json({message: 'Error', error})
    }
});

router.post('/employees', async (req, res) => {
    const data = req.body;
    const newEmp = new Employee({ 
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        position: data.position,
        salary: data.salary,
        date_of_joining: data.date_of_joining,
        department: data.department
    })
    try{
        const createdEmp = await newEmp.save(); 
        res.status(201).json({
            message: 'Employee Created Successfully', 
            Employee: createdEmp 
        }) 
    }catch (err) {
        return res.status(500).json({ 
            message: "Error creating Employee", 
            error: err.message 
        });
    }
})

router.get('/employees/:eid', async (req, res) => {
    const eid = req.params.eid; 
    try{
        const employee = await Employee.findById(eid); 
        if(!employee) res.status(404).send({message: "Employee Not Found"})
        res.status(200).json(employee);
    } 
    catch(err){
        res.status(500).send({message: err.message})
    }
})

router.put('/employees/:eid', async (req, res) => {
    const eid = req.params.eid;
    const data = req.body; 

    try{
        const updatedEmployee = await Employee.findByIdAndUpdate(
            eid, 
            data, 
            {new: true}); 
    
        if(!updatedEmployee){
            res.status(404).json({message: 'Employee Not Found'})
        } 
        return res.status(200).json({
            message: "Employee Updated",
            note: updatedEmployee
        });
    } catch (err) {
        return res.status(500).json({ 
            message: "Error Updating employee", 
            error: err.message 
        });
    }
});


router.delete('/employees/:eid', async (req, res) => {
    const eid = req.params.eid;
    try{
        const deleteEmp = await Employee.findByIdAndDelete(eid);
        if(!deleteEmp){
            res.status(404).json({message: 'Employee Not Found'});
        }
        return res.status(200).send({message: "Deleted Employee Successfully"})
    } 
    catch (err) {
        return res.status(500).json({ 
            message: "Error Deleting Employee", 
            error: err.message 
        })
    }
});
router.get('/emp/search', async (req, res) => {
    const { department, position } = req.query; 

    try {
        const filter = {};
        if (department) filter.department = department;
        if (position) filter.position = position;

        const employees = await Employee.find(filter); 
        if (!employees.length) {
            return res.status(404).json({ message: 'No employees found for the given criteria' });
        }
        res.status(200).json(employees); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
});
module.exports = router;
