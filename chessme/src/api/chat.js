import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { message } = req.body;

    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
      headers: {
        'x-rapidapi-key': '5e71ca68f7msh2314ae7f7956503p121ac4jsnb3f9cfe1e0c7',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        web_access: false
      }
    };

    try {
      const response = await axios.request(options);
      const botMessage = response.data.messages[0]?.content || 'Sorry, I could not process your request.';
      res.status(200).json({ text: botMessage });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ text: 'Sorry, I could not process your request.' });
    }
  } else {
    res.status(405).json({ text: 'Method Not Allowed' });
  }
}
