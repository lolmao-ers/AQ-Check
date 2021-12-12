const mongoose = require('mongoose');
require('dotenv').config();

(async function keepTrying() {
  try {
      console.log("Connecting to MongoDB...");
      const connectionString = `mongodb://${process.env.DB_CONNECTION_USERNAME}:${process.env.DB_CONNECTION_PASSWORD}@${process.env.DB_CONNECTION_HOSTNAME}:${process.env.DB_CONNECTION_PORT}/smog?authSource=admin`;
      // console.log(connectionString);
      await mongoose.connect(`mongodb://${process.env.DB_CONNECTION_USERNAME}:${process.env.DB_CONNECTION_PASSWORD}@${process.env.DB_CONNECTION_HOSTNAME}:${process.env.DB_CONNECTION_PORT}/smog?authSource=admin`);
      console.log("Connected to MongoDB");
  }
  catch {
      console.log("Could not connect to MongoDB");
      keepTrying();
  }
})();
