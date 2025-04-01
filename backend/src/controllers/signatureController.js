const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

const generateSignature = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'A prompt is required' });
    }

    const response = await axios({
      method: 'POST',
      url: 'https://api.replicate.com/v1/predictions',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait'
      },
      data: {
        version: "3699362ed9e98d32d05c7e99f747772960463dac9af70ebda3b98e69bd9f9b90",
        input: {
          model: "dev",
          prompt: prompt,
          go_fast: false,
          lora_scale: 1,
          megapixels: "1",
          num_outputs: 4,
          aspect_ratio: "1:1",
          output_format: "jpg",
          guidance_scale: 3,
          output_quality: 100,
          prompt_strength: 0.8,
          extra_lora_scale: 1,
          num_inference_steps: 28
        }
      }
    });

    res.status(200).json({
      id: response.data.id,
      status: response.data.status
    });
  } catch (error) {
    console.error('Error generating signature:', error);
    res.status(500).json({ error: 'Failed to generate signature' });
  }
};

const checkSignatureStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Prediction ID is required' });
    }

    const response = await axios({
      method: 'GET',
      url: `https://api.replicate.com/v1/predictions/${id}`,
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({
      id: response.data.id,
      status: response.data.status,
      output: response.data.output,
      error: response.data.error
    });
  } catch (error) {
    console.error('Error checking signature status:', error);
    res.status(500).json({ error: 'Failed to check signature status' });
  }
};

module.exports = {
  generateSignature,
  checkSignatureStatus
}; 