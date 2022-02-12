export const makeShortLink = length => {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt( Math.floor( Math.random() * charactersLength ) )
    }

    return result
}

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
    return domain
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