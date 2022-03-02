const request = require("postman-request");
const { REPL_MODE_SLOPPY } = require("repl");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZmRla29jayIsImEiOiJja3p3b21ucnIwMXB1MnVydnc1aml3cTJiIn0.5_o9PSKzyL3NNj3n8kP0AA&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      //no need to specify undefined for response, just being explicit here
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search", undefined);
    } else {
      data = {
        location: body.features[0].place_name,
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
