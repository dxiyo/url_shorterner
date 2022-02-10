import express from 'express'
import bodyParser from 'body-parser'

const router = express.Router()

const bodyParserJson = bodyParser.json()

router.post('/', bodyParserJson, (req, res) => {
    // TODO: call function from controller
    console.log(req.body.url)
})
 


export default router