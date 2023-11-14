const express = require('express');

const { User, Cohort } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();




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


module.exports = router;
