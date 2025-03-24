// CREATE SERVER USING NODE
// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   response.write("Response");

//   return response.end();
// });

// server.listen(3333);

// CREATING SERVER WITH FASTIFY
import { fastify } from "fastify";
import { DataBaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DataBaseMemory();

// POST localhost:3333/videos
server.post("/videos", (request, reply) => {
  const { title, description, duration } = request.body;

  database.create({
    //short sintax
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", () => {
  return "get videos";
});

server.put("/videos/:id", () => {
  return "put videos";
});

server.delete("/videos/:id", () => {
  return "delete video";
});

server.listen({
  port: 3333,
});
