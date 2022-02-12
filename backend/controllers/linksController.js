// import redis, { storeAllLinksInArrayOfObjects } from '../models/database.js'
import * as DB from '../models/database.js'
import * as Links from '../utilities/index.js'

export const addLink = async (req, res) => {
    const link = req.body.url

    const subDomain = Links.hasSubDomain(link) ? Links.getSubDomainInitial(link) : ''
    const subFolders = Links.hasSubFolders(link) ? Links.getSubFolderInitials(link) : ''
    // if there's no subdomain or subfolder, takes only the domain name from the link. if there is either a subdomain or a subfolder, only use the initial of the domain.
    const domain = subDomain + Links.getDomain(link) + subFolders

    if( await DB.isMemberOfDomainSet(domain) === 1) {
        res.json({
            message: "this link is already inserted."
        })
        return
    }
    DB.addDomainToSet(domain)
    
    const reply = await DB.setLinkHash(domain, link)
    
    res.json({
        message: "link added successfuly!",
        link
    })
}

// redirects the short link to the real link
export const getLink = async (req, res) => {
    const domain = req.params.url
    const link = await DB.getLinkHash(domain)
    res.redirect(link)
}

// returns all links
export const getAllLinks = async (req, res) => {
    const links = await DB.storeAllLinksInArrayOfObjects()
    res.json(links)
}