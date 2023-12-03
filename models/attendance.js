const pool = require("../db")

exports.markAttendance= async(teacherId, status) =>{
    const query = 'INSERT INTO attendance (teacher_id, status, date) VALUES ($1, $2, CURRENT_DATE)';
    const values = [teacherId, status];

    try {
        await pool.query(query, values);
        return { success: true };
    } catch (error) {
        console.error(error.stack);
        return { success: false, error: 'Internal Server Error' };
    }
}

exports.getAttendanceByTeacherId = async(teacherId, date)=> {
    const query = 'SELECT * FROM attendance WHERE teacher_id = $1 AND date = $2';
    const values = [teacherId, date];
    console.log(values);

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
}

exports.getLeavesTakenByMonth = async(teacherId, year, month)=> {
    const query = 'SELECT status FROM attendance WHERE teacher_id = $1 AND EXTRACT(YEAR FROM date) = $2 AND EXTRACT(MONTH FROM date) = $3';
    const values = [teacherId, year, month];

    try {
        const result = await pool.query(query, values);
        const attendanceStatusArray = result.rows.map(row => row.status);
        // Calculate leaves taken
        const leavesTaken = attendanceStatusArray.filter(status => status === 'Absent').length +
                            0.5 * attendanceStatusArray.filter(status => status === 'Half_Day').length;

        return leavesTaken;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
}
