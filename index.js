const express = require('express');
const adminRouter = require('./routes/adminRouter');
const attendanceRouter = require('./routes/attendanceRouter');
const teacherRouter = require('./routes/teacherRouter');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/admin', adminRouter);
app.use('/attendance', attendanceRouter);
app.use('/teacher', teacherRouter);


app.listen(port,()=>{console.log(`listenig at http://localhost:${port}`);})