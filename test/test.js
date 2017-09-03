const assert = require('power-assert')
const fs     = require('fs')
const nock   = require('nock')
const github = require('../github-search')

describe('', () => {
    before(() => {
        const filePath = './nock-search-setting.json'
        nock.load(filePath)
    })
    it('It should be able to search and receive data from github.com.', async () => {
        const result = await github.searchAsync('bleno').catch(() => null)

        assert(result !== null)
    })
})
