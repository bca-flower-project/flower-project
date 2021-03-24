// -----basic express server----
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const staticDir = path.resolve("./build");
i
//Set up static file server
app.use(express.static(staticDir));

//Create path to './index.html' page and use * to direct all paths to index.html
app.get("*", (req, res) => {
  res.sendFile(staticDir + "/index.html");
});

//Tell the express server to listen and to console.log inside Node what server it is listening on
app.listen(port, () => console.log(`Quiz server running on ${port}`));
