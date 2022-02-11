import redis, { storeAllLinksInArrayOfObjects } from '../models/database.js'
import { addDomainToSet, getAllDomains, setLinkHash, isMemberOfDomainSet, getLinkHash } from '../models/database.js'

export const addLink = async (req, res) => {
    const link = req.body.url
    // takes only the domain name from the link
    const domain = link.split('.')[0].split('//')[1]

    if( await isMemberOfDomainSet(domain) === 1) {
        res.json({
            message: "this link is already inserted."
        })
        return
    }
    addDomainToSet(domain)
    
    const reply = await setLinkHash(domain, link)
    
    res.json({
        message: "link added successfuly!",
        link
    })
}

// redirects the short link to the real link
export const getLink = async (req, res) => {
    const domain = req.params.url
    const link = await getLinkHash(domain)
    res.redirect(link)
}

// returns all links
export const getAllLinks = async (req, res) => {
    const links = await storeAllLinksInArrayOfObjects()
    res.json(links)
}