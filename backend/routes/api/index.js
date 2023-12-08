const router = require('express').Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth.js')
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const userRouter = require('./users.js');
const cohortRouter = require('./cohort.js');
const studentRouter = require('./students.js');


router.use(restoreUser)

router.use('/session', sessionRouter);

router.use('/users', userRouter);

router.use('/cohorts', cohortRouter);

router.use('/students', studentRouter);



router.post('/test',(req, res) =>{
    res.json({requestBody: req.body});

});





//! AUTH middleware testing routes
// router.get(
//     '/restore-user',
//     (req, res) =>{
//         return res.json(req.user)
//     }
// )

// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) =>{
//         return res.json(req.user)
//     }
// )

// router.get('/set-token-cookie', async (_req, res) =>{
//     const user = await User.findOne({
//         where:{
//             username: 'Demo-lition'
//         }
//     })
//     setTokenCookie(res, user)
//     return res.json({user: user})
// })
// router.post('/test', function(req, res){
//     res.json({requestBody: req.body})
// })




module.exports = router;
