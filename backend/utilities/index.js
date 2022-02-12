export const cutHTTP = string => {
    let regex = /[a-zA-Z]+:\/\//i
    return string.split(regex).join('')
}

export const getDomain = string => {

    const stringWithoutHTTP = cutHTTP(string)
    let indexOfDomain = 0

    if( hasSubDomain( string ) ) {
        indexOfDomain = 1
    }

    const domain = stringWithoutHTTP.split('.')[ indexOfDomain ]

    // if there's either a subdomain or a subfolder, return only the initial of the domain
    if( !hasSubDomain(string) && !hasSubFolders(string) ) {
        return domain
    } else {
        return domain.charAt(0)
    }
}

export const hasSubDomain = string => {
    let regex = /[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+/i
    return regex.test(string)
}

export const getSubDomain = string => {
    if ( !hasSubDomain(string) ) {
        return false
    }
    const stringWithoutHTTP = cutHTTP(string)
    let regex = /\.[a-zA-Z]+.*[a-zA-Z]+/i
    return stringWithoutHTTP.split(regex).join('')
}

export const hasSubFolders = string => {
    let regex = /([a-zA-Z]+(\.[a-zA-Z]+)+)\/[a-zA-Z]+/i
    return regex.test(string)
}

export const getSubFolders = string => {
    let regex = /([a-zA-Z]+(\.[a-zA-Z]+)+)\//i
    const stringArr = string.split(regex) // [ 'https://', 'app.google.com', '.com', 'folders/images' ] i want the last item aka the subfolders of the url
    const subFolders = stringArr[ stringArr.length - 1]
    return subFolders
}

export const getSubFolderInitials = string => {
    let subfolders = getSubFolders(string)
    let initials = ''
    const subFoldersArr = subfolders.split('/')
    subFoldersArr.forEach( subF => initials += subF.charAt(0) )
    return initials
}

console.log( getSubFolders('http://blog.example.com/subfolder/blog-post') )