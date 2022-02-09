const convertForm = document.getElementById('convertForm')

convertForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const urlInput = document.querySelector('#urlInput').value
    const output = document.querySelector('#output')

    // if url field is empty
    if( urlInput === "" ) {
        output.innerHTML = "Please enter a URL."
        return
    }

    if( !isValidURL(urlInput) ) {
        output.innerHTML = "Please enter a valid URL."
        return
    }

    // send the url to the backend
    fetch('http://localhost:5000/', {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: urlInput })
    })
    .then( res => res.json() )
    .then( data => console.log("this is the data: ", data) )

})

const isValidURL = url => {
    // Author: Diego Perini
    // Created: 2010/12/05
    // Updated: 2018/09/12
    // License: MIT
    //
    // Copyright (c) 2010-2018 Diego Perini (http://www.iport.it)
    const urlRegex = new RegExp("^" +
    // protocol identifier (optional)
    // short syntax // still required
    "(?:(?:(?:https?|ftp):)?\\/\\/)" +
    // user:pass BasicAuth (optional)
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broadcast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
      // host & domain names, may end with dot
      // can be replaced by a shortest alternative
      // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
      "(?:" +
        "(?:" +
          "[a-z0-9\\u00a1-\\uffff]" +
          "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
        ")?" +
        "[a-z0-9\\u00a1-\\uffff]\\." +
      ")+" +
      // TLD identifier name, may end with dot
      "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")" +
    // port number (optional)
    "(?::\\d{2,5})?" +
    // resource path (optional)
    "(?:[/?#]\\S*)?" +
  "$", "i")

    return urlRegex.test(url)
}