const pool = require("../db")

exports.create= async (username, password, salt)=> {
    const query = 'INSERT INTO admin (username, password, salt) VALUES ($1, $2, $3)';
    const values = [username, password, salt];

    try {
        await pool.query(query, values);
        return { success: true };
    } catch (error) {
        console.error(error.stack);
        return { success: false, error: 'Internal Server Error' };
    }
}

exports.getByUsername = async(username)=> {
    const query = 'SELECT * FROM admin WHERE username = $1';
    const values = [username];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error(error.stack);
        return null;
    }
}

exports.getTeachersWithExcessiveLeaves = async ()=> {
    const query = 'SELECT teacher_id, COUNT(*) FROM attendance GROUP BY teacher_id HAVING COUNT(*) >= $1';
    const values = [7];

    try {
        const result = await pool.query(query, values);
        return result.rows.map(row => row.teacher_id);
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};