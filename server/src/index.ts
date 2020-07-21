import * as fastify from 'fastify'
import * as fastifyBlipp from 'fastify-blipp'
import * as fastifyStatic from 'fastify-static'
import * as path from 'path'
import axios from 'axios'
import {getSingleOpts} from './routeOptions'
import { IGetSingleQuery, IProduct } from './interfaces'

const server = fastify()
    .register(fastifyBlipp)
    .register(fastifyStatic, {
        wildcard: true,
        root: path.join(__dirname, '../../client/public'),
      })

server.get("/", (_, reply) => {
    reply.sendFile("index.html")
})

// Return one IProduct
server.get<IGetSingleQuery>("/GetSingle", getSingleOpts, async (req, reply) => {
    const res = await axios.get("https://next.json-generator.com/api/json/get/EkzBIUWNL")
    const products : Array<IProduct> = res.data
    const id = req.query.id.slice(1)
    const product = products.find(product => product._id === id)
    if(product){
        return product
    }
    reply.code(400).send()
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