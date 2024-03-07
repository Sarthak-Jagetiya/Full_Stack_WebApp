const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require("./routes/userRoute");
const stateRouter = require("./routes/stateRoute");
const languageRouter = require("./routes/languageRoute");
const artFormRouter = require("./routes/artFormRoute");
const danceFormRouter = require("./routes/danceFormRoute");
const foodRouter = require("./routes/foodRoute");
const commentsRouter = require("./routes/commentsRoute");

app.use("/api/users", userRouter);
app.use("/api/state", stateRouter);
app.use("/api/languages", languageRouter);
app.use("/api/art", artFormRouter);
app.use("/api/dance", danceFormRouter);
app.use("/api/food", foodRouter);
app.use("/api/comments", commentsRouter);

module.exports = app;
