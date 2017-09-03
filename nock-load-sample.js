const fs     = require('fs')
const nock   = require('nock')
const github = require('./github-search')

async function main() {
    const filePath = './nock-search-setting.json'
    nock.load(filePath)

    const result = await github.searchAsync('bleno').catch(() => null)
    if (!result) {
        console.error(new Error('Request failed.'))
    }

    console.log(JSON.stringify(result, null, 4))
}

main()
