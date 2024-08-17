import express, { Express } from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index.route";

// cấu hình file env
dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

// cài đặt pug
app.set("views", `./views`);
app.set("view engine", "pug");

// client routes
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
