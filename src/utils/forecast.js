const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  url =
    "http://api.weatherstack.com/current?access_key=e55e212b62c2098a0ab2ba738f6f8265&query=" +
    longitude +
    "," +
    latitude +
    "&units=m";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.success === false) {
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        body.location.name +
          ": " +
          body.current.weather_descriptions[0] +
          ", currently " +
          body.current.temperature +
          "C (feels like " +
          body.current.feelslike +
          "C) with " +
          body.current.precip +
          "% chance rain"
      );
    }
  });
};

module.exports = forecast;
