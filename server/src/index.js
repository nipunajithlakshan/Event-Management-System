import dotEnv from "dotenv";
dotEnv.config();
import app from "./app.js";
import config from "./config/index.js";
import connectDB from "./database/connection.js";
import db from './database/models/index.js';

const PORT = config.PORT || 3001;

async function startServer() {
  try {
    // Connect to the database
    connectDB().then(() => {
      db.sequelize.sync({ alter: true }).then(() => {
        console.log("All models synchronized.");
      });
    });
    app.listen(PORT, () => {
      console.log(`Event Service Running On Port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
