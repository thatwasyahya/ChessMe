import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
            'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Use environment variables
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = response.data.messages[0]?.content || 'Sorry, I could not process your request.';
      res.status(200).json({ text: botMessage });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ text: 'Sorry, I could not process your request.' });
    }
  } else {
    res.status(405).json({ text: 'Method not allowed' });
  }
}
