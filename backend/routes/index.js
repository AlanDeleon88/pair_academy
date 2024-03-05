const express = require('express')
const router = express.Router()

const apiRouter = require('./api')

router.use('/api', apiRouter)

//! serve react build files in production

if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    //! serve the frontend's index.html file at the root route

    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
        )

    })

    //! serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../frontend/build")));

    //! serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        )
    })
}

// router.get('/hello/world', function(req, res){
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.send('hello WOLRD!')
// })


if (process.env.NODE_ENV !== 'production') {

    router.get('/api/csrf/restore', (req, res) =>{
        const csrfToken = req.csrfToken();
        res.cookie('XSRF-TOKEN', csrfToken)
        res.status(200).json({
            'XSRF-Token' : csrfToken
        })
    })
}



module.exports = router
