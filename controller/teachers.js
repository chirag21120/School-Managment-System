const Teacher = require('../models/teachers');

exports.createTeacher = async(req, res)=> {
    const { name, subject,salary } = req.body;

    const result = await Teacher.createTeacher(name, subject, salary);

    if (result.success) {
        res.status(200).json({ message: 'Teacher created successfully' });
    } else {
        res.status(500).json({ error: result.error });
    }
}



