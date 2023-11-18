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


module.exports = router;