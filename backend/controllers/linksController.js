// import redis, { storeAllLinksInArrayOfObjects } from '../models/database.js'
import { addDomainToSet, getAllDomains, setLinkHash, isMemberOfDomainSet, getLinkHash, storeAllLinksInArrayOfObjects } from '../models/database.js'
import * as Links from '../utilities/index.js'

export const addLink = async (req, res) => {
    const link = req.body.url

    const subDomain = Links.hasSubDomain(link) ? Links.getDomain(link) : ''
    const subFolders = Links.hasSubFolders(link) ? Links.getSubFolderInitials(link) : ''
    // if there's no subdomain or subfolder, takes only the domain name from the link. if there is either a subdomain or a subfolder, only use the initial of the domain.
    const domain = subDomain + Links.getDomain(link) + subFolders

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