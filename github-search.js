const https  = require('https')

function searchAsync(keyword) {
    const option = {
        hostname: 'api.github.com',
        path    : `/search/repositories?q=${keyword}`,
        headers : {
            'User-Agent': 'Test Client'
        }
    }

    return new Promise((resolve, reject) => {
        https.get(option, (res) => {
            const { statusCode } = res

            if (statusCode !== 200) {
                res.resume()
                return reject(new Error('Request failed.'))
            }

            res.setEncoding('utf8')
            let rawData = ''

            res.on('data', (chunk) => rawData += chunk)
            res.on('end', () => {
                resolve(rawData)
            })
        }).on('error', (err) => {
            return reject(err)
        })
    })
}

module.exports = {
    searchAsync: searchAsync
}