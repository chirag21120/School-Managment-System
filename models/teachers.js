const pool = require("../db")

exports.createTeacher = async(name, subject,salary) =>{
    const query = 'INSERT INTO teachers (username, subject,salary) VALUES ($1, $2,$3) RETURNING teacher_id as id';
    const values = [name, subject,salary];

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


