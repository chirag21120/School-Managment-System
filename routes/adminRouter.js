const express = require('express');
const router = express.Router();
const AdminController = require('../controller/Admin');

router.post('/register', AdminController.register);
router.post('/login', AdminController.login);
router.get('/getExcessiveLeaves', AdminController.getTeachersWithExcessiveLeaves);

module.exports = router;
