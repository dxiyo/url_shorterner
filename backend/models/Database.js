import 'dotenv/config'
import Redis from 'ioredis'

// connect to redis database
const redis = new Redis({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD
});

// add an item to the domains set (its like an array in redis)
export const addDomainToSet = async domain => await redis.sadd(`domains`, domain)
// get all the items
export const getAllDomains = async () => await redis.smembers('domains')

// return 0 or 1
export const isMemberOfDomainSet = async domain => await redis.sismember('domains', domain)

// sets a hash (like an object in redis) where the identifier is the domain name, "longLink" is the key, and the value is the full link
export const setLinkHash = async ( domain, link ) => await redis.hset(`links:${domain}`, 'longLink', link)

// gets a specific hash (again like an object) by the id and asks for the key you want (there's only longLink in these objects anyway)
export const getLinkHash = async domain => await redis.hget(`links:${domain}`, 'longLink')

// as far as i can tell, redis doesn't have the ability to store an array of objects, or a set of hashes more accurately. this function creates that. it loops over the domain set and uses the name of each item to get the hash with the same id name. it pushes the hash and the domain name as an object into an array and returns a full array of objects.
export const storeAllLinksInArrayOfObjects = async () => {
    const domains = await getAllDomains()
    let links = []
    for ( const domain of domains ) {
        const link = await getLinkHash(domain)
        links.push({
            shortLink: `http://localhost:5000/${domain}`,
            longLink: link
        })
    }

    return links
}

export default redis