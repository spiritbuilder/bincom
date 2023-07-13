import express from "express";
import path from "path";
import pug from "pug";
import { fileURLToPath } from "url";
import appRouter from "./routes.js";
import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let PORT = process.env.PORT;
let app = express();
app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.use("/", appRouter);

app.listen(PORT || 3433, () => {
  console.log("app started");
});
