const express = require('express');
const router = express.Router();

const { Student } = require('../models/student');
const { Department } = require('../models/department');
const { Course } = require('../models/course');
const { User } = require('../models/user');

const app = express();


router.get('/students/index', async (req, res) => {
    try {
        let sort = {};
        if (req.query.sort) {
            sort = { createdAt: req.query.sort === 'asc' ? 1 : -1 }; // Simplify sort object creation
        }

        const students = await Student.find().sort(sort); 
        console.log("Student Index Route - Students:", students); // Add console log to check if data is present

        res.render({ students }); // Send the data in JSON format
    } catch (error) {
        console.error("Error fetching students:", error); // Log the error
        res.status(500).json({ error: 'An error occurred while fetching students' }); // Send error response
    }
});



router.get('/getStudentInfo', async (req, res) => {
    const studentInfo = await Student.findOne({
        'StudentId.ClassRollNo': req.query.studentRollNo
    });

    if (studentInfo) {
        res.send(studentInfo);
    } else {
        res.status(400).send('Resource not found.');
    }
});

router.get('/get-department', async (req, res) => {
    const dept = await Department.find({}).select({
        dname: 1,
        _id: 0
    });

    if (dept) {
        res.send(dept);
    } else {
        res.status(400).send('Resource not found...');
    }
});

router.get('/get-courses', async (req, res) => {
    const courses = await Course.find({
        departmentName: req.query.deptName
    }).select({
        courseName: 1,
        _id: 0
    });

    if (courses) {
        res.send(courses);
    } else {
        res.status(400).send('Resource not found...');
    }
});

router.get('/users/:id', async (req, res) => {
    const getUser = await User.findOne({
        _id: req.params.id
    });

    if (getUser) {
        res.send(getUser);
    } else {
        res.status(400).send('Resource not found...');
    }
});

module.exports = router;
