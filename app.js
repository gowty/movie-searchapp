var express = require("express"),
  bodyParser = require("body-parser"),
  axios = require("axios");
const omdb = require("omdb-js")("6e714b3d");

app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  omdb.searchForMovie({}).then(function(blog) {
    res.render("home", { blog: blog.Search });
  });
});

app.post("/search", function(req, res) {
  axios
    .get("http://www.omdbapi.com/?apikey=6e714b3d&t=" + req.body.content)
    .then(function(response) {
      console.log(response);
      res.render("home", { blog: [response.data] });
    });
});

app.listen(5000, function(req, res) {
  console.log("server started at port 5000");
});
