import express from 'express'
import bodyParser from 'body-parser'
import { addLink } from '../controllers/linksController.js'

const router = express.Router()

const bodyParserJson = bodyParser.json()

router.post('/', bodyParserJson, addLink)

router.get('/:link', (req, res) => {
    // TODO: call function from controller
    res.send(req.params.link)
})
 


export default router