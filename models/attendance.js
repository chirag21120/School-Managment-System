const pool = require("../db")

exports.markAttendance= async(teacherId, date, status) =>{
    const query = 'INSERT INTO attendance (teacher_id, date, status) VALUES ($1, $2, $3)';
    const values = [teacherId, date, status];

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

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
}
