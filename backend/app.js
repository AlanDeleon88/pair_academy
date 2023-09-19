const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser');

const {ValidationError} = require('sequelize')


const {environment} = require('./config')
const isProduction = environment === 'production';

const app = express()

const routes = require('./routes')



app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

//!Security Middleware

if(!isProduction){
    app.use(cors())
}

//! use helmet to set different headers to secure app
app.use(
    helmet.crossOriginResourcePolicy({
        policy : "cross-origin"
    })
)

//! Set _csrf token and create a req.csrfToken method
app.use(
    csurf({
        cookie:{
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
)

app.use(routes)

app.use((_req, _res, next) =>{
    const err = new Error('The requested resource could not be found.')
    err.title = "Resource not found"
    err.errors = ['The requested resource could not be found.']
    err.status = 404
    next(err);
})

//! Process sequelize errors
app.use((err, _req, _res, next) =>{
    if(err instanceof ValidationError){
        err.errors = err.errors.map(e => e.message)
        err.title = 'Validation error'
    }
    next(err)
})

//! Error Formatter

app.use((err, _req, res, _next) =>{
    res.status(err.status || 500)
    console.error(err)
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.statck
    })
})

module.exports = app;
