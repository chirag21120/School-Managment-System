const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Attendance = require('../models/attendance');
const Teacher = require('../models/teachers');


exports.register = async(req, res)=> {
    const { username, password } = req.body;

    // Generate a random salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await Admin.create(username, hashedPassword, salt);

    if (result.success) {
        res.status(200).json({ message: 'Registration successful' });
    } else {
        res.status(500).json({ error: result.error });
    }
}

exports.login =async(req, res)=> {
    const { username, password } = req.body;
    const admin = await Admin.getByUsername(username);
    if (admin && await bcrypt.compare(password, (admin.password).toString('utf-8'))) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

exports.getTeachersWithExcessiveLeaves = async function (req, res) {

    const teachers = await Admin.getTeachersWithExcessiveLeaves();

    if (teachers !== null) {
        res.status(200).json({ teachers });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.calculateSalary = async (req,res)=>{
    const {teacherId, year, month} = req.params;
    const leaves = await Attendance.getLeavesTakenByMonth(teacherId,year,month);
    const salary = await Teacher.getSalary(teacherId);
    const minLeaves = 0;
    if(leaves && salary){
        if(leaves<=minLeaves){
            res.status(200).json({salary: salary});
        }
        else{
            const additionalLeaves = leaves - minLeaves;
            const finalSalary = salary - (salary/30)*additionalLeaves;
            res.status(200).json({salary:finalSalary});
        }
    }
    else{
        res.status(500).json({error:' Internal Server Error'});
    }
}

