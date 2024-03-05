const express = require('express');

const { User, Cohort, Student } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const validateStatus = [
    check('student')
        .exists({ checkFalsy: true })
        .notEmpty()
        .equals('present' || 'absent')
        .withMessage('Invalid input, cannot be empty and must be "present" or "absent"'),
        handleValidationErrors

]

//* /students?firstName=John&lastName=Doe
router.get(
    '/',
    async (req, res, next) => {
        const { Op } = require('sequelize');
        const { firstName, lastName } = req.query;
        //TODO add pagination? maybe?
        const where = {};

        if (firstName) {
            where.firstName = {[Op.like] : `%${firstName}%`};
        }
        if (lastName) {
            where.lastName = { [Op.like]: `%${lastName}%` };
        }

        const students = await Student.findAll({
            where
        })

        res.statusCode = 200;

        res.json(students);

    }
)

router.get(
    '/:id',
    async (req, res, next) => {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            //!error
        }

        res.statusCode = 200;

        res.json(student);
    }
)

//! edit student status
router.patch(
    '/:id/status/edit',
    [validateStatus, requireAuth],
    async (req, res, next) => {
        const { id } = req.params;
        const { status } = req.body;
        const student = await Student.findByPk(id)

        if (!student) {
            const err = new Error('Could not find student with that Id');
            err.status = 404;
            err.title = 'student not found';
            err.errors = ['student not found'];
            return next(err);
        }

        await Student.update({
            status
        })

        res.statusCode = 200;
        res.json(student);
    }
    )
//! edit student timeZone

//! edit student email

//! edit student name


module.exports = router;
