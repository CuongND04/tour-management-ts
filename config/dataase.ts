import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  process.env.DATABASE_NAME, // tên db
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST, // Link hosting
    dialect: "mysql",
  }
);

// kiểm tra xem kết nối thành công không
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection success.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

export default sequelize;
