import { Sequelize } from "sequelize";

const databaseUrl =
  "postgres://postgres.eumxhfvgcfiagjvxuagi:CV$CwkFBz3ysbLY@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

// CV$CwkFBz3ysbLY
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
