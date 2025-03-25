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

server.get("/videos", (request, reply) => {
  const videos = database.list();

  return reply.send({ videos: videos });
  // return videos -- this is another way
});

server.put("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  const video = request.body;

  database.update(videoId, video);
  // database.update(videoId, {...video});

  return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id

  database.delete(videoId)

  return reply.status(204).send()
});

server.listen({
  port: 3333,
});
