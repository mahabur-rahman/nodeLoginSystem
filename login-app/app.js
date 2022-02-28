const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const router = require("./routes/router");
const app = express();
const PORT = process.env.PORT || 3000;

// body parser | middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// load statice file
const staticPath = path.join(__dirname, "/public");
app.use("/static", express.static(staticPath));

// session
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

// post method
app.use("/route", router);

// home
app.get("/", (req, res) => {
  res.render("base", {
    title: "User Info Validation",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on request http://localhost:${PORT}`);
});
