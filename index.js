require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const database = require('./database')
const questionController =require('./controllers/question')
const Auth =require('./controllers/Auth')
app.use(morgan('dev'))
app.use(cors())
app.use('/api',Auth)
app.use('/api/questions',questionController)
app.all('/', (req, res) => {
    return res.status(200).json({
        message: 'Success',
    })
})

app.listen(process.env.PORT, () => {
    console.log('Server Started')
})