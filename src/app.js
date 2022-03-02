const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { response } = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve (default before explicit handlers)
app.use(express.static(publicPath));

// Defualt for home page
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Francois de Kock",
    email: "francois.dekock@gmail.com",
  });
});

// Specific about and futher handlers, help, weather etc
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Francois de Kock",
    email: "francois.dekock@gmail.com",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMsg: "Help me!!!",
    title: "Help",
    name: "Francois de Kock",
    email: "francois.dekock@gmail.com",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longitude, latitude, (error, foreCastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: foreCastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// Help error handler
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 Error",
    errorMessage: "Help article not found",
  });
});

// 404 page catch all
app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Error",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
