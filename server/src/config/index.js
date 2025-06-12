import dotEnv from "dotenv";

dotEnv.config();

const getEnvironment = () => {
  // If NODE_ENV is set, use it; otherwise, default to "local"
  const environment = process.env.NODE_ENV || "development";
  if (environment) {
    return {
      PORT: process.env.PORT || 3001,
      MONGODB_URI: process.env.MONGODB_URI,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
    };
  } else {
    return {};
  }
};

const config = getEnvironment();

export default config;
