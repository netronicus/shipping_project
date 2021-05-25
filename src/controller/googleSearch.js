const { default: fetch } = require("node-fetch");

const searchPlaces = async (string) => {
  return await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?query=${string}&key=AIzaSyAU9cv5t6os6ZiH8MUXzh-tvbGr5D4_yfI`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

module.exports = searchPlaces;