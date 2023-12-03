const express = require('express');
const router = express.Router();
const TeacherController = require('../controller/teachers');

router.post('/createTeacher', TeacherController.createTeacher);

module.exports = router;
