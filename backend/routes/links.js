import express from 'express'
import bodyParser from 'body-parser'
import * as LinksController from '../controllers/linksController.js'

const router = express.Router()

const bodyParserJson = bodyParser.json()

router.post('/', bodyParserJson, LinksController.addLink)

router.get('/all', LinksController.getAllLinks)
router.get('/:url/stats', LinksController.getLinkStats)
router.get('/:url', LinksController.getLink)

 


export default router