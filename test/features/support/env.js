'use strict'

require('chai')
  .use(require('chai-as-promised'))
  .should()

const configure = function () {
  this.setDefaultTimeout(60 * 1000)
}

module.exports = configure
