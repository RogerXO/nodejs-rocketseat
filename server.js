// CREATE SERVER USING NODE
// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   response.write("Response");

//   return response.end();
// });

// server.listen(3333);

// CREATING SERVER WITH FASTIFY
import { fastify } from "fastify";

const server = fastify();

server.get("/", () => {
  return "Hello World";
});

server.get("/node", () => {
  return "Hello Node";
});

server.get("/hello", () => {
  return "Hello User";
});

server.listen({
  port: 3333,
});
