// -----basic express server----
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
require("dotenv").config();

//Set up static file server
const staticDir = process.env.PRODUCTION
  ? path.resolve("./client/build")
  : path.resolve("./client/public");

//path for petal questions to populate the modals

app.use(express.static(staticDir));

//shows api
app.get("/api", (req, res) => {
  res.sendFile(path.resolve("./api/questions.json"));
});

//Create path to './index.html' page and use * to direct all paths to index.html
app.get("*", (req, res) => {
  res.sendFile(staticDir + "/index.html");
});

// ------------DB FOR PETALS/FLOWERS/COLORS----------//
const entrySchema = new .Schema({
  {
    "users": {
      "UID": {
        "peaks": {
          "color": "#000000",
          "question":[0]",
          "answer": ""
      }, "aspirations": {
            "color": "#000000",
            "question": "",
            "answer": ""
    },    "people": {
            "color": "#000000",
            "question": "",
            "answer": ""
  },      "principles": {
            "color": "#000000",
            "question": "",
            "answer": ""
},        "powers": {
            "color": "#000000",
            "question": "",
            "answer": ""
},        "challenges": {
            "color": "#000000",
            "question": "",
            "answer": ""
}
    }
    }
  }
  
  
  
//adding a new flower
// db.collection('users')
//   .doc("flower")
//   .set({
//     //pull in uid,
//     UID: "",
//     peaks: peaks,
//     challenges: "kjsfkjenf",
//     people: "wefewf",
//     principles: "fdjfalsjfldksjf",
//     powers: "jfkdsjflaksjfklds",
//     aspirations: "jdfklajdflkjda",
//   })
//   .then(() => {
//     console.log("Document successfully written!");
//   })
//   .catch((error) => {
//     console.error("Error writing document: ", error);
//   });

//-------------PORT------------//
//Tell the express server to listen and to console.log inside Node what server it is listening on
app.listen(port, () => console.log(`server running on ${port}`));
