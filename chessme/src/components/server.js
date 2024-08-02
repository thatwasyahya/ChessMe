const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post(
      'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
      {
        messages: [
          {
            role: 'user',
            content: req.body.message,
          },
        ],
        system_prompt: '',
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false,
      },
      {
        headers: {
          'x-rapidapi-key': '5e71ca68f7msh2314ae7f7956503p121ac4jsnb3f9cfe1e0c7', // Replace with your RapidAPI key
          'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      }
    );

    const botMessage = response.data.messages[0]?.content || 'Sorry, I could not process your request.';
    res.json({ text: botMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ text: 'Sorry, I could not process your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
