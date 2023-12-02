const Attendance = require('../models/attendance');

exports.markAttendance = async(req, res)=> {
    const { teacherId, date, status } = req.body;

    const result = await Attendance.markAttendance(teacherId, date, status);

    if (result.success) {
        res.status(200).json({ message: 'Attendance marked successfully' });
    } else {
        res.status(500).json({ error: result.error });
    }
}

exports.getAttendance = async (req, res)=> {
    const { teacherId, date } = req.params;

    const attendance = await Attendance.getAttendanceByTeacherId(teacherId, date);

    if (attendance) {
        res.status(200).json({ attendance });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

