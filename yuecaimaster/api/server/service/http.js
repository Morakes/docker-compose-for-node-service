const request = require('request')
let { promisify } = require('util')

const http = {
    request: promisify(request),
    async get(url) {
        const res = await this.request(url).catch(err => {
            throw err
        })
        return res.body
    },
    async post(url, data) {
        const res = await this.request({
            url,
            body: JSON.stringify(data),
            json: true,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
        }).catch(err => {
            throw err
        })
        return res.body
    },
}
module.exports = http
