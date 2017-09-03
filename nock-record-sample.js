const fs     = require('fs')
const nock   = require('nock')
const github = require('./github-search')

async function main() {
    nock.recorder.rec({output_objects: true})

    const result = await github.searchAsync('bleno').catch(() => null)
    if (!result) {
        console.error(new Error('Request failed.'))
    }

    const nockCallObjects = nock.recorder.play()
    const filePath = './nock-search-setting.json'
    fs.writeFileSync(filePath, JSON.stringify(nockCallObjects, null, 4))
}

main()
