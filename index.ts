import express, { Express } from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import clientRoutes from "./routes/client/index.route";
import moment from "moment";
import bodyParser from "body-parser";
import path from "path";
// cấu hình file env
dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

// nhúng file tĩnh
app.use(express.static("public"));

// cài đặt pug
app.set("views", `./views`);
app.set("view engine", "pug");

// chuyển req nhận được thành json
app.use(bodyParser.json());
// xử lí body nhận từ form
app.use(bodyParser.urlencoded({ extended: false }));
// app local variable
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE
// client routes
clientRoutes(app);
// admin routes
adminRoutes(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
