const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/weather", async (request, response) => {
  try {
    const { city } = request.query;
    if (!city) {
      return response.status(400).json({ error: "City parameter is required" });
    }

    const API_KEY = process.env.API_KEY_NAME;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`;

    const weatherResponse = await axios.get(URL);

    response.json(weatherResponse.data);
  } catch (error) {
    console.error("Error fetching weather data");
    response.status(500).json({ error: "Error fetching forecast data" });
  }
});

router.get("/forecast", async (request, response) => {
  try {
    const { city } = request.query;
    if (!city) {
      response.status(400).json({ error: "City parameter is required" });
    }

    const API_KEY = process.env.API_KEY_NAME;
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`;

    const forecastResponse = await axios.get(URL);

    response.json(forecastResponse.data);
  } catch (error) {}
});

module.exports = router;
