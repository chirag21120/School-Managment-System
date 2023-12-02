const express = require('express');
const router = express.Router();
const AttendanceController = require('../controller/attendance');

router.post('/markAttendance', AttendanceController.markAttendance);
router.get('/getAttendance/:teacherId/:date', AttendanceController.getAttendance);

module.exports = router;
