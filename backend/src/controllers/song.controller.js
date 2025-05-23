import { Song } from "../models/song.model.js";

export const allSongs = async () => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    return res.status(200).json(songs);
  } catch (error) {
    console.error("songs fething error", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const featuredSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    return res.status(200).json(songs);
  } catch (error) {
    console.error("featured songs error", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const madeforYouSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    return res.status(200).json(songs);
  } catch (error) {
    console.error("made for you songs error", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const trendingSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    return res.status(200).json(songs);
  } catch (error) {
    console.error("trending songs error", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
