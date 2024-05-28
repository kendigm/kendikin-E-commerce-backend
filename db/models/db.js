import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const databaseUrl = process.env.STRIPE_SECRET_KEY;

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
