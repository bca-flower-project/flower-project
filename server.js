// -----basic express server----
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const staticDir = path.resolve("./build");
const { ObjectId } = require("mongodb");


//Set up static file server
const staticDir = path.resolve("./client/public");

//Create path to './index.html' page and use * to direct all paths to index.html
app.get("*", (req, res) => {
  res.sendFile(staticDir + "/index.html");
});

// -----------MONGOOSE----------//

const mongoose = require("mongoose");

//always needs a url, and / connects it to that db
//this connects to our database
mongoose.connect("mongodb://localhost:27017/flower-project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//connects it to the FP database
const flowerDB = mongoose.connection;

//if we don't set up an error output, mongoose may just exit if there is an error
const db = flowerDB;
db.on("error", console.error.bind(console, "connection error"));


//creating a schema. Schema is a class, so the S is capitalized
//adding in data-types
//this is the entrySchema Model -- this is what writes to specific collection /enforces shape
const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
});

//the first argument for model is what you want to connect to, the second is the schema you have set up
//LoginModel is the reference to the model.
const LoginModel = mongoose.model("login", loginSchema);
app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));

//adding a new login
app.post("/add", async (req, res) => {
  let newLogin = new LoginModel({
    email: req.body.email,
    password: req.body.password,
  });
  await newLogin.save();
  res.redirect("/");
});


//-------------PORT------------//
//Tell the express server to listen and to console.log inside Node what server it is listening on
app.listen(port, () => console.log(`server running on ${port}`));
