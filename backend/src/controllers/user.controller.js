import { Song } from "../models/song.model.js";
import { Stats } from "../models/stats.model.js";
import { User } from "../models/user.model.js";

export const updateStats = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { songId } = req.params;
    const { liked, disliked } = req.body;

    if (!songId) {
      return res.status(400).json({ error: "Song ID is required" });
    }

    if (liked === true && disliked === true) {
      return res
        .status(400)
        .json({ error: "Cannot like and dislike at the same time" });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    let stats = await Stats.findOne({ user: user._id });
    const now = new Date();

    if (!stats) {
      stats = await Stats.create({
        user: user._id,
        views: [
          {
            songId: song._id,
            playCount: 1,
            liked: liked || false,
            dislike: disliked || false,
            lastPlayed: now,
          },
        ],
      });
      user.stats.push(stats._id);
      await user.save();
    } else {
      const view = stats.views.find(
        (v) => v.songId.toString() === song._id.toString()
      );

      if (view) {
        view.playCount += 1;
        view.lastPlayed = now;

        if (liked !== undefined) {
          view.liked = liked;
          view.dislike = false;
        } else if (disliked !== undefined) {
          view.dislike = disliked;
          view.liked = false;
        }
      } else {
        stats.views.push({
          songId: song._id,
          playCount: 1,
          liked: liked || false,
          dislike: disliked || false,
          lastPlayed: now,
        });
      }

      await stats.save();
    }

    res.status(200).json({ message: "Stats updated successfully", stats });
  } catch (error) {
    console.error("Stats update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
