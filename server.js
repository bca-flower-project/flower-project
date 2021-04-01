// -----basic express server----
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
require('dotenv').config()


//Set up static file server
const staticDir = process.env.PRODUCTION ? path.resolve("./client/build") : path.resolve('./client/public')

//path for petal questions to populate the modals

//shows api
app.get("/api", (req, res) => {
  res.sendFile(path.resolve("./api/questions.json"));
});


//Create path to './index.html' page and use * to direct all paths to index.html
app.get("*", (req, res) => {
  res.sendFile(staticDir + "/index.html");
});


// ------------DB FOR PETALS/FLOWERS----------//




//-------------PORT------------//
//Tell the express server to listen and to console.log inside Node what server it is listening on
app.listen(port, () => console.log(`server running on ${port}`));
