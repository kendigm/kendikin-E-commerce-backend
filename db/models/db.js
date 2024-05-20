import { Sequelize } from "sequelize";

const databaseUrl =
  "postgres://postgres.qnshoczrgybxoecmbygc:" +
  encodeURIComponent("$J#*LvdUx_6K932") +
  "@aws-0-ap-south-1.pooler.supabase.com:5432/postgres";

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
