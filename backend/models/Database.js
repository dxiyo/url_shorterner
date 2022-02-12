import 'dotenv/config'
import Redis from 'ioredis'

// connect to redis database
const redis = new Redis({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD
});
// addDomainToSet => addShortLinkToSet
// add an item to the short links set (its like an array in redis)
export const addShortLinkToSet = async shortLink => await redis.sadd(`shortLinks`, shortLink)
// get all the items
export const getAllShortLinks = async () => await redis.smembers('shortLinks')

// return 0 or 1
export const isMemberOfShortLinkSet = async shortLink => await redis.sismember('shortLinks', shortLink)

// sets a hash (like an object in redis) where the identifier is the shortLink name, "longLink" is the key, and the value is the full link. "visits" is another key with a default 0 value.
export const setLinkHash = async ( shortLink, link ) => await redis.hmset(shortLink, 'longLink', link, 'visits', 0)

// gets a specific hash (again like an object) by the id and asks for the key you want (there's only longLink in these objects anyway)
export const getLinkHash = async shortLink => await redis.hget(shortLink, 'longLink')

export const getLinkHashStats = async shortLink => await redis.hgetall(shortLink)

// increment the visits
export const incrementLinkVisits = async shortLink => await redis.hincrby(shortLink, 'visits', 1)

// as far as i can tell, redis doesn't have the ability to store an array of objects, or a set of hashes more accurately. this function creates that. it loops over the shortLink set and uses the name of each item to get the hash with the same id name. it pushes the hash and the shortLink name as an object into an array and returns a full array of objects.
export const storeAllLinksInArrayOfObjects = async () => {
    const shortLinks = await getAllShortLinks()
    let links = []
    for ( const shortLink of shortLinks ) {
        const link = await getLinkHash(shortLink)
        links.push({
            shortLink: `http://localhost:5000/${shortLink}`,
            longLink: link
        })
    }

    return links
}

export default redis