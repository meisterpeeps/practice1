import * as fastify from 'fastify'



export const suggestionsOptions: fastify.RouteShorthandOptions = {
    schema: {
        querystring: {
            value: { type: 'string' },
            searchType: { type: 'string' }
        },
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        street: { type: 'string' },
                        city: { type: 'string' },
                        state: { type: 'string' }
                    }
                }
            }
        }
    }
}
