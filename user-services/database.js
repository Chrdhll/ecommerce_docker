const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: 5432,
    logging: false,
    retry: {
      max: 5, // retry connect
    },
  }
);

const connectDB = async () => {
  let connected = false;

  while (!connected) {
    try {
      await sequelize.authenticate();
      console.log("✅ PostgreSQL connected");
      connected = true;
    } catch (err) {
      console.log("⏳ Waiting for PostgreSQL...");
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};

connectDB();

module.exports = sequelize;
