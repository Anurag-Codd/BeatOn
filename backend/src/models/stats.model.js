import mongoose from "mongoose";

const statsSchems = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    views: [
      {
        songId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Song",
        },
        liked: Boolean,
        dislike: Boolean,
        playCount: {
          type: Number,
          default: 0,
        },
        lastPlayed: {
          type: Date,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Stats = mongoose.model("Stats", statsSchems);
