const Teacher = require('../models/teachers');

exports.createTeacher = async(req, res)=> {
    const { name, subject } = req.body;

    const result = await Teacher.createTeacher(name, subject);

    if (result.success) {
        res.status(200).json({ message: 'Teacher created successfully' });
    } else {
        res.status(500).json({ error: result.error });
    }
}

exports.takeLeave = async function (req, res) {
    const { teacherId, leaveDate } = req.body;

    const result = await Teacher.takeLeave(teacherId, leaveDate);

    if (result.success) {
        res.status(200).json({ message: 'Leave taken successfully' });
    } else {
        res.status(500).json({ error: result.error });
    }
};

exports.getLeavesTakenByMonth = async function (req, res) {
    const { teacherId, year, month } = req.params;

    const leavesTaken = await Teacher.getLeavesTakenByMonth(teacherId, year, month);

    if (leavesTaken !== null) {
        res.status(200).json({ leavesTaken });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTeachersWithExcessiveLeaves = async function (req, res) {
    const { maxLeavesPerMonth } = req.params;

    const teachers = await Teacher.getTeachersWithExcessiveLeaves(maxLeavesPerMonth);

    if (teachers !== null) {
        res.status(200).json({ teachers });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
