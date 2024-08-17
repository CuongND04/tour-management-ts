import express, { Express, Request, Response } from "express";
import sequelize from "./config/dataase";
import dotenv from "dotenv";
import Tour from "./models/tour.model";
dotenv.config();
sequelize; // nó là một cái biến nên chỉ cần gọi ra thôi

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

// cài đặt pug
app.set("views", `./views`);
app.set("view engine", "pug");

app.get("/tours", async (req: Request, res: Response) => {
  const tours = await Tour.findAll({ raw: true });
  res.render("client/pages/tours/index", {
    tours: tours,
  });
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
