const express = require('express');

const {setTokenCookie, requireAuth} = require('../../utils/auth');
const { User, Cohort } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
        check('email')
        .exists( {checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
        check('username')
        .exists( {checkFalsy: true })
        .isLength({ min:4 })
        .withMessage('Please provide a username with at least 4 characters.'),
        check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
        check('password')
        .exists({ checkFalsy : true})
        .isLength( {min: 6})
        .withMessage('Password must be 6 characters or more.'),
        handleValidationErrors
];


router.get(
    '/:userId/cohorts',
    async (req, res) => {
        let { userId } = req.params;

        // console.log(id);

        const cohorts = await Cohort.findAll({
            where: {
                teacherId : userId
            }
        })
        res.statusCode = 200;

        return res.json({
            cohorts
        })
    }


)

//sign up
router.post(
    '/',
    validateSignup,
    async (req, res) =>{
        const {email, password, username} = req.body;
        const user = await User.signup({email, username, password});

        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
)




module.exports = router;
