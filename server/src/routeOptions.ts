import * as fastify from 'fastify'



export const getManyOpts: fastify.RouteShorthandOptions = {    
    schema: {
      querystring: {
            page: { type: 'number' },
            minPrice: {type: 'number'},
            maxPrice: {type: 'number'},
            search: {type: 'string'},
            sort: {type: 'string'} // typeSort
      },
      response: {
        200: {
          type: 'object',
          properties: {
              pageProducts: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: {type: 'string'},
                        price: {type: 'string'},
                        image: {type: 'string'},
                        about: {type: 'string'},
                        name: {type: 'string'}
                    }
                }
              },
              pages: {type: 'number'},
              productCount: {type: 'number'},
              page: {type: 'number'}
          }
        }
      }
    }
}

export const getSingleOpts: fastify.RouteShorthandOptions = {
    schema: {
        querystring: {
            id: { type: 'string' },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    _id:  {type: 'string'},
                    price: {type: 'string'},
                    image: {type: 'string'},
                    about: {type: 'string'},
                    name: {type: 'string'}
                }
            }
        }
    }
}
  