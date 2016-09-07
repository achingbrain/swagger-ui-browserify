'use strict'

const webDriver = require('selenium-webdriver')
let driver

if (process.env.BROWSER === 'chrome') {
  const chrome = require('selenium-webdriver/chrome')
  const service = new chrome.ServiceBuilder(require('chromedriver').path).build()
  chrome.setDefaultService(service)

  driver = new webDriver.Builder()
    .withCapabilities(webDriver.Capabilities.chrome())
    .build()
} else {
  const webdriver = require('selenium-webdriver')
  driver = new webdriver.Builder()
      .forBrowser('firefox')
      .build()
}

module.exports = driver
