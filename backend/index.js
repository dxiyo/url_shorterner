import express from 'express'
import cors from 'cors'
import 'dotenv/config'


import router from './routes/links.js'

const app = express()
app.use(cors())
app.use( '/', router )

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started at port ${PORT}`))