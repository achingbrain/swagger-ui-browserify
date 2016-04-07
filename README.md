# swagger-ui-browserify

Use [swagger-ui](https://github.com/swagger-api/swagger-ui) with browserify.

Supports version 2.1.3 and 2.0.24. Why?  Because 2.1.3 tries to convert a Swagger 1.2 into a Swagger 2 definition and it's not always a one-to-one mapping.

## Installation

Version 2.1.3 (Swagger Spec v2.0)

```sh
$ npm install --save swagger-ui-browserify@2.1.3b
```

Version 2.0.24 (Swagger Spec v1.2)

```sh
$ npm install --save swagger-ui-browserify@2.0.24c
```

## jQuery & Handlebars

SwaggerUI uses old versions of jQuery and Handlebars.  If you are also using these libraries on the same page and wish to avoid loading multiple versions of them you should specify the same versions in your `package.json` file:

| Library    | Version |
| ---------- | ------- |
| Handlebars | ^1.1.2  |
| jQuery     | ^1.9.1  |

## Example (swagger-ui version 2.1.3, spec v2.0)

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

## Example (swagger-ui version 2.0.24, spec v1.2)

The only difference is that swagger-ui expects a singleton `swaggerUi` object to be defined on `window`.

```javascript
// in your app.js file
var SwaggerUi = require('swagger-ui-browserify')

window.swaggerUi = new SwaggerUi({
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
window.swaggerUi.load()
```

## Assets

You will need to make the CSS/images/font assets bundled with swagger-ui available to be referenced from your app's html page.  See the example [2.0.24/v1.2](https://github.com/achingbrain/swagger-ui-browserify-example-v1.2/blob/master/gulpfile.js) or [2.1.3/v2.0](https://github.com/achingbrain/swagger-ui-browserify-example-v2.0/blob/master/gulpfile.js) gulpfiles for more.
