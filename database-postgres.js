import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DataBasePostgres {
  async list(search) {
    let videos;

    if (search) {
      videos = await sql`SELECT * FROM videos WHERE title ILIKE ${
        search + "%"
      }`;
    } else {
      videos = await sql`SELECT * FROM videos`;
    }

    return videos;
  }

  async create(video) {
    const videoId = randomUUID();
    const { title, description, duration } = video;

    await sql`INSERT INTO videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
  }

  async update(id, video) {
    const { title, description, duration } = video;

    await sql`UPDATE videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`;
  }

  async delete(id) {
    await sql`delete from videos where id = ${id}`;
  }
}
