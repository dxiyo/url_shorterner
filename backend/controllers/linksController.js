import redis from '../models/database.js'
import Commander from 'ioredis'

const redisDemo = async () => {
    // const reply = await redis.hset('links:google', 'longLink', 'https://google.com')
    const reply = await redis.hget('links:google', 'longLink')
    console.log(reply)
};

// redisDemo();
const commander = new Commander()

export const addLink = async (req, res) => {
    const link = req.body.url
    // takes only the domain name from the link
    const domainName = link.split('.')[0].split('//')[1]
    const reply = await redis.hset(`links:${domainName}`, 'longLink', link)
    console.log(reply)
}

// commander.keyType()

// console.log(commander.getBuiltinCommands())