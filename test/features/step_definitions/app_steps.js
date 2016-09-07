'use strict'

const httpServer = require('http-server')
const path = require('path')
let url = null

module.exports = function () {
  this.Given(/^the app is running$/, function (callback) {
    const app = httpServer.createServer({
      root: path.resolve(path.join(__dirname, '..', '..', 'fixtures', 'public')),
      port: 0
    })
    app.listen(error => {
      url = `http://localhost:${app.server.address().port}`

      callback(error)
    })
  })

  this.Given(/^I visit (.*)$/, function (page) {
    if (!page.match(/https?:/)) {
      page = `${url}${page}`
    }

    return this.visit(page)
  })
}
