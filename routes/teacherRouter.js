const express = require('express');
const router = express.Router();
const TeacherController = require('../controller/teachers');

router.post('/createTeacher', TeacherController.createTeacher);
router.post('/takeLeave', TeacherController.takeLeave);
router.get('/getLeavesTaken/:teacherId/:year/:month', TeacherController.getLeavesTakenByMonth);
router.get('/getExcessiveLeaves/:maxLeavesPerMonth', TeacherController.getTeachersWithExcessiveLeaves);

module.exports = router;
