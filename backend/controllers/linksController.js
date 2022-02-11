import redis from '../models/database.js'
import Commander from 'ioredis'

const commander = new Commander()

export const addLink = async (req, res) => {
    const link = req.body.url
    // takes only the domain name from the link
    const domainName = link.split('.')[0].split('//')[1]
    const reply = await redis.hset(`links:${domainName}`, 'longLink', link)
    console.log(reply)
}

export const getLink = async (req, res) => {
    const shortLink = req.params.url
    const reply = await redis.hget(`links:${shortLink}`, 'longLink')
    res.redirect(reply)
}