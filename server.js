// CREATE SERVER USING NODE
// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   response.write("Response");

//   return response.end();
// });

// server.listen(3333);

// CREATING SERVER WITH FASTIFY
import { fastify } from "fastify";
// import { DataBaseMemory } from "./database-memory.js";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();

// const database = new DataBaseMemory();
const database = new DataBasePostgres();

// POST localhost:3333/videos
server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    //short sintax
    title,
    description,
    duration,
  });

  return reply.status(201).send({ message: "Video create successfully" });
});

server.get("/videos", async (request, reply) => {
  const search = request.query.search;

  const videos = await database.list(search);

  return reply.send({ videos: videos });
  // return videos -- this is another way
});

server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const video = request.body;

  await database.update(videoId, video);
  // database.update(videoId, {...video});

  // return reply.status(204)
  return reply.send({ message: "Video updated successfully" });
});

server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  // return reply.status(204)
  return reply.send({ message: "Video deleted successfully" });
});

server.listen({
  port: process.env.PORT ?? 3333,
});
