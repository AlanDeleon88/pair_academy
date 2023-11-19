const express = require('express');

const { User, Cohort, Student } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const user = require('../../db/models/user');

const router = express.Router();

const validateCohort = [
    check('cohort')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a cohort name'),
    handleValidationErrors
]

validateNewStudent = [
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a name with at least 2 characters'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a last name with at least 2 characters'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
]



//! get all students in a cohort
router.get(
    '/:id/students',
    async (req, res, next) => {
        const {id} = req.params
        let cohort = await Cohort.findByPk(id, {
            include: [
                {
                    model: Student,
                    attributes:['id', 'firstName', 'lastName', 'timeZone', 'status']
                }
            ]
        })
        if (!cohort) {
            //! throw error
        }

        res.statusCode = 200;
        res.json({
            cohort
        })
    }
)

//! get cohort by ID
router.get(
    '/:id',
    async (req, res, next) => {
        const { id } = req.params;
        const cohort = await Cohort.findByPk(id);

        if (!cohort) {
            const err = new Error('Could not find cohort with that ID');
            err.status = 404;
            err.title = 'Cohort not found';
            err.errors = ['Cohort not found'];
            return next(err);
        }

        res.statusCode = 200;

        return res.json({
            cohort
        })

    }
)

//! find all cohorts
router.get(
    '/',
    async (req, res) => {
        const cohorts = await Cohort.findAll()

        res.statusCode = 200;

        return res.json({
            cohorts
        })
    }
)

//! Create new cohort
router.post(
    '/',
    [validateCohort, requireAuth],
    async (req, res, next) => {
        const { cohort } = req.body;
        const { user } = req;
        const userId = req.user.id;

        const newCohort = await Cohort.create({
            cohort,
            teacherId : userId
        })
        user.addCohorts([newCohort])
        res.statusCode = 201;
        res.json(newCohort)
    }
)

//! create new student in cohort
router.post(
    '/:id/students/new/',
    [validateNewStudent, requireAuth],
    async (req, res, next) => {
        const { id } = req.params;
        const { firstName, lastName, email, timeZone, status } = req.body;

        const cohort = await Cohort.findByPk(id);
        if (!cohort) {
            //! throw error
        }

        const newStudent = await Student.create({
            firstName: firstName,
            lastName: lastName,
            cohortId: cohort.id,
            email: email,
            timeZone: timeZone,
            status: status
        })

        cohort.addStudents([newStudent]);
        res.statusCode = 201;
        res.json({
            cohort,
            student: newStudent
        });

    }
)

module.exports = router;
