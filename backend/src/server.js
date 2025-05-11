import "dotenv/config";
import app from "./app.js";
import { createServer } from "node:http";
import { connectDB } from "./config/connectDB.js";

const server = createServer(app);

connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server running at Port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
