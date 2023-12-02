const pool = require("../db")

exports.createTeacher = async(name, subject) =>{
    const query = 'INSERT INTO teachers (username, subject) VALUES ($1, $2) RETURNING teacher_id as id';
    const values = [name, subject];

    try {
        const result = await pool.query(query, values);
        console.log(result);
        const newTeacherId = result.rows[0].id;
        return { success: true, teacherId: newTeacherId };
    } catch (error) {
        console.error(error.stack);
        return { success: false, error: 'Internal Server Error' };
    }
}

exports.takeLeave = async function (teacherId, leaveDate) {
    const query = 'INSERT INTO teacher_leave (teacher_id, leave_date) VALUES ($1, $2)';
    const values = [teacherId, leaveDate];

    try {
        await pool.query(query, values);
        return { success: true };
    } catch (error) {
        console.error(error.stack);
        return { success: false, error: 'Internal Server Error' };
    }
};

exports.getLeavesTakenByMonth = async function (teacherId, year, month) {
    const query = 'SELECT COUNT(*) FROM teacher_leave WHERE teacher_id = $1 AND EXTRACT(YEAR FROM leave_date) = $2 AND EXTRACT(MONTH FROM leave_date) = $3';
    const values = [teacherId, year, month];

    try {
        const result = await pool.query(query, values);
        return result.rows[0].count;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

exports.getTeachersWithExcessiveLeaves = async function (maxLeavesPerMonth) {
    const query = 'SELECT teacher_id, COUNT(*) FROM teacher_leave GROUP BY teacher_id HAVING COUNT(*) > $1';
    const values = [maxLeavesPerMonth];

    try {
        const result = await pool.query(query, values);
        return result.rows.map(row => row.teacher_id);
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};