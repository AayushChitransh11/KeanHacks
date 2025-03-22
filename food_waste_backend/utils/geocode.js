const axios = require('axios');
require('dotenv').config();

const geocodeAddress = async (addressString) => {
  const apiKey = process.env.OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(addressString)}&key=${apiKey}`;

  const response = await axios.get(url);
  const geometry = response.data.results[0]?.geometry;
  if (!geometry) throw new Error('Geocoding failed');

  return {
    type: 'Point',
    coordinates: [geometry.lng, geometry.lat]
  };
};

module.exports = geocodeAddress;