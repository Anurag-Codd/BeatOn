import {Song} from "../models/song.model.js";
import {Album} from "../models/album.model.js";
import { deleteFile, uploadFile } from "../config/cloudinary.js";

function publicId(file) {
  return file.split("/").slice(-2).join("/").split(".")[0];
}

export const createSong = async (req, res) => {
  try {
    if (!req.files || !req.files.audio || !req.files.image) {
      return res.status(400).json({ error: "files are required" });
    }

    const { title, artist, duration, albumId } = req.body;
    const { image } = req.files;
    const { audio } = req.files;

    if (!image || !audio) {
      return res.status(400).json({ error: "image and audio is required" });
    }

    const imageUrl = await uploadFile(image[0].buffer, "image");
    const audioUrl = await uploadFile(audio[0].buffer);

    const song = await Song.create({
      title,
      artist,
      imageUrl: imageUrl.secure_url,
      audioUrl: audioUrl.secure_url,
      duration,
      albumId: albumId || null,
    });

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    return res.status(201).json({ message: "song created" });
  } catch (error) {
    console.error("unable to add song", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { songId } = req.params;

    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    const imagePublicId = publicId(song.imageUrl);
    const audioPublicId = publicId(song.audioUrl);

    await deleteFile(imagePublicId);
    await deleteFile(audioPublicId);
    await Song.findByIdAndDelete(songId);

    return res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("unable to delete song", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAlbum = async (req, res) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { image } = req.files;

    if (!title || !artist || !releaseYear) {
      return res.status(400).json({ error: "album fileds are required" });
    }

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const imageUrl = await uploadFile(image[0].buffer, "image");

    await Album.create({
      title,
      artist,
      imageUrl: imageUrl.secure_url,
      releaseYear,
    });

    return res.status(201).json({ message: "album created sucessfully" });
  } catch (error) {
    console.error("album not created", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({ error: "album not exist" });
    }

    const songs = await Song.find({ albumId });

    for (const song of songs) {
      const imagePublicId = publicId(song.imageUrl);
      const audioPublicId = publicId(song.audioUrl);

      if (imagePublicId) await deleteFile(imagePublicId);
      if (audioPublicId) await deleteFile(audioPublicId);

      await Song.findByIdAndDelete(song._id);
    }

    await Album.findByIdAndDelete(albumId);

    return res
      .status(200)
      .json({ message: "Album and associated songs deleted successfully" });
  } catch (error) {
    console.error("unable to delete album", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const isAdmin = async (req, res) => {
  return res.status(200).json({ admin: true });
};

