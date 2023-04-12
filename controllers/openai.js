const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generatePicture = async function (req, res) {
  const { prompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt,
      size: "512x512",
    });

    const { url } = response.data.data[0];

    res.status(200).json({
      success: true,
      data: url,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};

router.post("/", generatePicture);

module.exports = router;
