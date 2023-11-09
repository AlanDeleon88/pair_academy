const express = require('express');

const { User, Cohort } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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
