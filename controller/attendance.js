const Attendance = require('../models/attendance');

exports.markAttendance = async(req, res)=> {
    const { teacherId, status } = req.body;

    const result = await Attendance.markAttendance(teacherId, status);

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

exports.getLeavesTakenByMonth = async(req, res)=> {
    const { teacherId, year, month } = req.params;

    try {
        // Get leaves taken by teacher in the specified month
        const leavesTaken = await Attendance.getLeavesTakenByMonth(teacherId, year, month);

        if (leavesTaken !== null) {
            res.status(200).json({ success: true, leavesTaken });
        } else {
            res.status(500).json({ success: false, error: 'Error fetching attendance data' });
        }
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}


