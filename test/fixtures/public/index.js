console.info('yess!')

const SwaggerUi = require('../../../dist')

const swaggerUi = new SwaggerUi({
  url: 'http://petstore.swagger.io/v2/swagger.json',
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
