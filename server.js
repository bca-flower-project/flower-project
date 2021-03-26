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
// see notes in notes.txt
//only store the userID; all emails and passwords should be stored in the authentication/firebase


// ------------DB FOR PETALS/FLOWERS----------//




//-------------PORT------------//
//Tell the express server to listen and to console.log inside Node what server it is listening on
app.listen(port, () => console.log(`server running on ${port}`));
