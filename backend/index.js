import express from 'express'
import cors from 'cors'


import router from './routes/links.js'

const app = express()
app.use(cors())
app.use( '/', router )


app.listen(5000, () => console.log("server started at port 5000"))