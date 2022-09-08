const express = require('express')
const dotenv = require('dotenv').config()
const cookie = require('cookie-parser')
const userRouter = require('./routes/user-routes')
const adminRouter = require('./routes/admin-routes')
const connectDB = require('./config/DBconfig')
const fileUpload = require('express-fileupload')

const app = express()
const port = process.env.PORT || 5001

connectDB()
app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(fileUpload())

app.use('/api/users',userRouter)
app.use('/api/admin',adminRouter)

app.listen(port,()=>console.log(`server running at ${port}`))