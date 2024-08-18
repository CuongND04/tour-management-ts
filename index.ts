import express, { Express } from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index.route";
import moment from "moment";
// cấu hình file env
dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

// nhúng file tĩnh
app.use(express.static("public"));

// cài đặt pug
app.set("views", `./views`);
app.set("view engine", "pug");

// app local variable
app.locals.moment = moment;

// client routes
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
