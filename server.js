import {createServer} from "node:http"

 const server = createServer(() => {
    console.log("Hello world!")
 })

 server.listen(3333)