# swagger-ui-browserify

[![Build Status](https://travis-ci.org/achingbrain/swagger-ui-browserify.svg?branch=master)](https://travis-ci.org/achingbrain/swagger-ui-browserify)

Use [swagger-ui](https://github.com/swagger-api/swagger-ui) with browserify.

Supports version 2.1.4 and 2.0.24. Why?  Because 2.1.3 tries to convert a Swagger 1.2 into a Swagger 2 definition and it's not always a one-to-one mapping - for example see [OAI/OpenAPI-Specification#182](https://github.com/OAI/OpenAPI-Specification/issues/182).

This is the 2.1.4/v2.0 branch.  See [2.0.24/v1.2](https://github.com/achingbrain/swagger-ui-browserify/tree/swagger-1.2) if you cannot upgrade to v2.0 of the spec.

## Installation

```sh
$ npm install --save swagger-ui-browserify
```

## Example

```javascript
// in your app.js file
var SwaggerUi = require('swagger-ui-browserify')

var swaggerUi = new SwaggerUi({
  url: '/apidocs',
  dom_id: 'swagger-ui-container',
  supportHeaderParams: true,
  onComplete: function (swaggerApi, swaggerUi) {
    console.log('Loaded SwaggerUI')
  },
  onFailure: function (error) {
    console.error('Unable to Load SwaggerUI', error)
  },
  apisSorter: 'alpha',
  operationsSorter: 'alpha',
  docExpansion: 'none'
})
swaggerUi.load()
```

## jQuery & Handlebars

SwaggerUI uses old versions of jQuery and Handlebars.  If you are also using these libraries on the same page and wish to avoid loading multiple versions of them you should specify the same versions in your `package.json` file:

| Library    | Version |
| ---------- | ------- |
| Handlebars | ^3.0.3  |
| jQuery     | ^1.9.1  |

## Assets

You will need to make the CSS/images/font assets bundled with swagger-ui available to be referenced from your app's html page.  See the example  [gulpfile.js](https://github.com/achingbrain/swagger-ui-browserify-example-v2.0/blob/master/gulpfile.js) for more.
