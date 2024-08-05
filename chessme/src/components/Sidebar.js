import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css'; // Assurez-vous que ce fichier CSS existe et est correctement importé

function Sidebar({ setGameMode, currentGameMode }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const switchElement = document.querySelector('.switch input');
    const handleToggle = () => {
      const switchContainer = switchElement.parentElement;
      if (switchElement.checked) {
        switchContainer.classList.add('active');
      } else {
        switchContainer.classList.remove('active');
      }
    };

    switchElement.addEventListener('change', handleToggle);
    return () => {
      switchElement.removeEventListener('change', handleToggle);
    };
  }, []);

  const generateBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    
    const responses = {
      'hello': "Hello! How can I assist you today?",
      'hi': "Hi there! What can I do for you?",
      'how are you': "I'm just a bot, but I'm here to help you!",
      'weather': "I'm not sure about the weather, but I hope it's nice where you are!",
      'bye': "Goodbye! Have a great day!",
      'chess': "Sure! Let's play chess. You start!",
      'play chess': "Alright, set up the board. You start!",
      'checkmate': "Checkmate! Well played!",
      'stalemate': "It's a stalemate. Good game!",
      'rules of chess': "The objective in chess is to checkmate your opponent's king. Each type of piece moves in a specific way. Pawns move forward but capture diagonally, rooks move in straight lines, knights move in an L-shape, bishops move diagonally, the queen can move in any direction, and the king can move one square in any direction.",
      'help': "You can ask me about the weather, play chess, or just chat!",
      'commands': "I can chat with you, play chess, or help with other queries you have!",
      'what is your name': "I'm a chatbot created to assist you.",
      'who created you': "I was created by a team of developers to help answer your questions.",
      'tell me a joke': "Why don't scientists trust atoms? Because they make up everything!",
      'what is the capital of france': "The capital of France is Paris.",
      'how old are you': "I'm ageless, but I was created recently to assist you.",
      'tell me a fun fact': "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible.",
      'can you help me with math': "Sure! What math problem do you need help with?",
      'what is the meaning of life': "42. According to The Hitchhiker's Guide to the Galaxy, it's the answer to the ultimate question of life, the universe, and everything.",
      'what is the speed of light': "The speed of light in a vacuum is approximately 299,792,458 meters per second.",
      'do you have any hobbies': "I enjoy chatting with you and helping out!",
      'what is your favorite color': "I don't have preferences, but I think blue is quite nice.",
      'what is the time': "I'm not sure, but you can check your device's clock!",
      'tell me a story': "Once upon a time in a land far, far away...",
      'sing me a song': "I'm a little teapot, short and stout...",
      'what is your favorite food': "I don't eat, but I imagine pizza is quite popular.",
      'are you real': "I'm as real as a collection of code can be!",
      'what do you think about humans': "I think humans are fascinating and creative beings.",
      'can you dance': "I can imagine dancing, but I don't have a body to dance with!",
      'do you have a family': "I don't have a family, but I have many developers who care for me.",
      'do you sleep': "I don't need sleep. I'm always here to help you.",
      'can you feel emotions': "I don't have feelings, but I'm designed to understand and respond to yours.",
      'are you intelligent': "I have artificial intelligence, which helps me assist you with various tasks.",
      'what do you know about space': "Space is vast and mysterious, with billions of stars, planets, and galaxies.",
      'tell me a riddle': "What has keys but can't open locks? A piano.",
      'can you drive a car': "I can't drive, but I can help you with directions!",
      'do you like music': "I can't listen to music, but I know a lot about it.",
      'can you cook': "I can't cook, but I can find recipes for you!",
      'what is your purpose': "My purpose is to assist you with information and tasks.",
      'do you believe in aliens': "The universe is vast, and it's possible that other life forms exist out there.",
      'can you swim': "I can't swim, but I can tell you about great swimming techniques.",
      'what is the best programming language': "Different languages are good for different tasks. Python, JavaScript, and C++ are some popular ones.",
      'how do airplanes fly': "Airplanes fly due to the principles of lift, thrust, drag, and gravity.",
      'can you speak other languages': "I can understand and respond in multiple languages!",
      'tell me a tongue twister': "She sells seashells by the seashore.",
      'what is the largest animal': "The blue whale is the largest animal on Earth.",
      'what is the smallest country': "Vatican City is the smallest country in the world.",
      'who is the president of the united states': "As of 2023, the president is Joe Biden.",
      'can you play games': "I can play text-based games like chess with you!",
      'do you like sports': "I don't play sports, but I can discuss them with you.",
      'what is your favorite book': "I don't read, but many people enjoy 'To Kill a Mockingbird'.",
      'can you read my mind': "I can't read minds, but I can help answer your questions.",
      'what is the tallest mountain': "Mount Everest is the tallest mountain above sea level.",
      'what is the deepest ocean': "The Pacific Ocean is the deepest ocean.",
      'do you know any quotes': "Sure! 'The only limit to our realization of tomorrow is our doubts of today.' - Franklin D. Roosevelt",
      'can you help me study': "I can provide information and resources to help you study.",
      'what is your favorite movie': "I don't watch movies, but 'The Matrix' is a popular choice.",
      'do you like art': "I appreciate the creativity and expression in art.",
      'what is your favorite animal': "I don't have preferences, but many people like dogs.",
      'can you help me code': "Sure! What programming question do you have?",
      'what is the best way to learn': "The best way to learn is to stay curious and keep practicing.",
      'can you help me with history': "Yes, I can provide historical information.",
      'what is the best way to stay healthy': "Eating well, exercising, and getting enough sleep are important for health.",
      'can you help me with science': "Absolutely! What scientific question do you have?",
      'what is the best vacation spot': "It depends on your preferences. Beaches, mountains, and cities all have great spots.",
      'do you like traveling': "I can't travel, but I can help you plan a trip.",
      'can you tell me about technology': "Technology is rapidly evolving, with advancements in AI, quantum computing, and more.",
      'what is the most spoken language': "English, Mandarin Chinese, and Spanish are among the most spoken languages in the world.",
      'what is the best way to relax': "Listening to music, reading, or spending time in nature can be relaxing.",
      'can you help me with geography': "Yes, I can provide information on geographical topics.",
      'what is the best way to save money': "Creating a budget and sticking to it is a great way to save money.",
      'do you like puzzles': "I enjoy helping solve puzzles!",
      'what is the most important invention': "There are many, but the wheel, the printing press, and the internet are significant.",
      'can you help me with my homework': "Yes, I can provide information and assistance with homework.",
      'what is the best way to learn a language': "Practice regularly, use language apps, and immerse yourself in the language.",
      'can you help me with philosophy': "Sure, I can discuss philosophical concepts and ideas.",
      'what is the best way to stay motivated': "Setting goals, staying positive, and taking breaks can help maintain motivation.",
      'can you help me with physics': "Absolutely! What physics question do you have?",
      'what is the most important skill': "Critical thinking and problem-solving are very important skills.",
      'can you help me with chemistry': "Yes, I can provide information on chemistry topics.",
      'what is the best way to learn math': "Practice regularly and understand the underlying concepts.",
      'can you help me with biology': "Yes, I can provide information on biology topics.",
      'what is the most important quality in a friend': "Trustworthiness and loyalty are important qualities in a friend.",
      'can you help me with literature': "Sure, I can discuss literary topics and provide information.",
      'what is the best way to manage time': "Prioritize tasks, create a schedule, and avoid procrastination.",
      'can you help me with writing': "Yes, I can provide tips and assistance with writing.",
      'what is the most important quality in a leader': "Integrity and the ability to inspire others are key qualities in a leader.",
      'can you help me with art history': "Yes, I can provide information on art history.",
      'what is the best way to stay positive': "Surround yourself with positive people, practice gratitude, and focus on solutions.",
      'can you help me with music theory': "Yes, I can provide information on music theory.",
      'what is the best way to learn coding': "Practice regularly, work on projects, and learn from resources like tutorials and courses.",
      'can you help me with economics': "Yes, I can provide information on economic topics.",
      'what is the best way to make friends': "Be open, approachable, and show genuine interest in others.",
      'can you help me with astronomy': "Absolutely! What astronomy question do you have?",
      'what is the best way to stay fit': "Regular exercise, a balanced diet, and adequate rest are key to staying fit.",
      'can you help me with grammar': "Yes, I can provide information on grammar rules and tips.",
      'what is the best way to improve memory': "Regular mental exercises, a healthy diet, and adequate sleep can improve memory.",
      'can you help me with social studies': "Yes, I can provide information on social studies topics.",
      'what is the best way to communicate effectively': "Listen actively, speak clearly, and be mindful of non-verbal cues.",
      'can you help me with psychology': "Yes, I can provide information on psychological concepts and topics.",
      'what is the best way to handle stress': "Practice relaxation techniques, stay organized, and take breaks when needed.",
      'can you help me with physics equations': "Yes, I can help you understand and solve physics equations.",
      'what is the best way to prepare for exams': "Study regularly, take practice tests, and get plenty of rest before the exam."
    };

    for (const [key, response] of Object.entries(responses)) {
      if (lowerCaseMessage.includes(key)) {
        return response;
      }
    }

    if (lowerCaseMessage.match(/^(pawn|rook|knight|bishop|queen|king) to [a-h][1-8]$/)) {
      return "Move noted. Your turn!";
    } else {
      return "I'm sorry, I didn't understand that. Can you rephrase?";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    const botMessage = { role: 'bot', content: generateBotResponse(inputMessage) };

    setChatMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setInputMessage('');
  };

  return (
    <div className="sidebar">
      <h2>Game Modes</h2>
      <div className="switch-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={currentGameMode === 'player'}
            onChange={() => setGameMode(currentGameMode === 'bot' ? 'player' : 'bot')}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="chatbox">
        <div className="chat-messages">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
