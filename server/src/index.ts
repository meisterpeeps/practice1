import * as fastify from 'fastify'
import * as fastifyBlipp from 'fastify-blipp'
import * as fastifyStatic from 'fastify-static'
import * as path from 'path'
import * as _ from 'lodash'
import {suggestionsOptions} from './routeOptions'
import { IGetSingleQuery, ISuggestion, IProperty} from './interfaces'
import * as fs from 'fs'


const filePath = path.join(__dirname, 'mockData.json')
const file = fs.readFileSync(filePath, 'utf8');
const allProperties : IProperty[]=  JSON.parse(file)
console.info('All Properties Loaded:', allProperties.length)

const server = fastify()
    .register(fastifyBlipp)
    .register(fastifyStatic, {
        wildcard: true,
        root: path.join(__dirname, '../../client/public'),
      })

server.get("/", (_, reply) => {
    reply.sendFile("index.html")
})

server.get<IGetSingleQuery>("/suggestions", suggestionsOptions, async (req, reply) => {
    const searchValue = req.query.value.toLowerCase()
    const searchType = req.query.searchType.toLowerCase()
    console.log('query', req.query);
    const suggestions = allProperties.reduce((acc, property) => {
        if(searchType === "name"){
            const isMatch = property.name
            .toLowerCase()
            .startsWith(searchValue)

            if(isMatch){
                const {id, name, city, state, street} = property
                acc.push({id, name, city, state, street})
                return acc
            }
            return acc
        }
        else{
            const isMatch = property.city
            .toLowerCase()
            .startsWith(searchValue) 
            || property.state
            .toLowerCase()
            .startsWith(searchValue)

            if(isMatch){
                const {id, name, city, state, street} = property
                acc.push({id, name, city, state, street})
                return acc
            }
            return acc
        }
    }, [] as ISuggestion[] )
    console.log('Suggestions Found:', suggestions);

    return suggestions.reduce((accumalator, current) => {
        if(!accumalator.some(item => item.name === current.name || item.city === current.city)) {
          accumalator.push(current);
        }
        return accumalator;
    },[] as ISuggestion[]);
});


const startServer = async () => {
    try{
        await server.listen(3000)
        console.log("Server listening");
        server.blipp()
    } catch (err) {
        console.log(err);
    }    
}
startServer()