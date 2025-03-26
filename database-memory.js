import { randomUUID } from "node:crypto";

export class DataBaseMemory {
  #videos = new Map();

  list(search) {
    const data = Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0];
        const data = videoArray[1];

        return { id, ...data };
      })
      .filter((video) => {
        if (search) {
          return video.title.toLowerCase().includes(search.toLowerCase());
        }

        return true;
      });

    return data;
  }

  create(video) {
    const videoId = randomUUID();
    this.#videos.set(videoId, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
