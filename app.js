//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
//internal import
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const app = express();
dotenv.config();
//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));
//requiesr parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//set view engine
app.set("view engine", "ejs");
//set static folder
app.use(express.static(path.join(__dirname, "public")));
//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));
//routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);
//404 error handling
app.use(notFoundHandler);
//common error handler
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
