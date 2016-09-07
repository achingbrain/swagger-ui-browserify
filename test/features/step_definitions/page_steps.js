'use strict'

const webDriver = require('selenium-webdriver')
const Key = require('selenium-webdriver/lib/input').Key
const By = webDriver.By
let form

const RETRIES = 5

module.exports = function () {
  this.When(/^I click the "([^"]*)" data link$/, function (id) {
    return this.click(By.css(`a[data-id='${id}']:nth-of-type(1)`), RETRIES)
  })

  this.When(/^I click the "([^"]*)" link in the "([^"]*)" section$/, function (action, section) {
    form = `${section}_${action}`
    return this.click(By.css(`#${form} h3 a`), RETRIES)
  })

  this.When(/^I enter "([^"]*)" as "([^"]*)"$/, function (value, target) {
    const selector = By.css(`#${form}_content input[name=${target}]:nth-of-type(1)`)
    const world = this

    return world.getVal(selector, RETRIES)
    .then(value => {
      const tasks = []

      for (let i = 0; i < value.length; i++) {
        tasks.push(world.sendKeys(selector, Key.BACK_SPACE, RETRIES))
      }

      return Promise.all(tasks)
    })
    .then(() => world.sendKeys(selector, value, RETRIES))
  })

  this.When(/^I click the "Try it out!" button$/, function () {
    return this.click(By.css(`#${form}_content input[type=submit]`), RETRIES)
  })

  this.Then(/^I expect to see "([^"]*)" in the response$/, function (text) {
    return this.getText(By.css(`#${form}_content .response_body`), RETRIES).should.eventually.contain(text)
  })
}
