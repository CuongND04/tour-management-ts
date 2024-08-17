import express, { Express, Request, Response } from "express";
import sequelize from "./config/dataase";
import dotenv from "dotenv";
dotenv.config();
sequelize; // nó là một cái biến nên chỉ cần gọi ra thôi

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

// cài đặt pug
app.set("views", `./views`);
app.set("view engine", "pug");

app.get("/tours", (req: Request, res: Response) => {
  res.render("client/pages/tours/index");
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
