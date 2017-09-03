const http = require('http')
const nock = require('nock')

nock('http://example.com').get('/').delayConnection(1000).reply(200, 'hello')

http.get('http://example.com', (res) => {
    const { statusCode } = res

    if (statusCode !== 200) {
        res.resume()
        return console.error(new Error('Request failed.'))
    }

    res.setEncoding('utf8')
    let rawData = ''

    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
        console.log(rawData)
    })
}).on('error', (err) => {
    console.error(err)
})
