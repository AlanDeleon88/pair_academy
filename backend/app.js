const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser');


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

module.exports = app;
