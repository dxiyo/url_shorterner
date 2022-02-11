import express from 'express'
import bodyParser from 'body-parser'
import { addLink, getLink } from '../controllers/linksController.js'

const router = express.Router()

const bodyParserJson = bodyParser.json()

router.post('/', bodyParserJson, addLink)

router.get('/:url', getLink)
 


export default router