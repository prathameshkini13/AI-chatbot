import React, { useState, useEffect } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import InputArea from './components/InputArea';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Typography, Paper } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from '@mui/icons-material/Settings';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10a37f',
    },
    background: {
      default: '#343541',
      paper: '#444654',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "## 👋 Hello! I'm your AI assistant\n\nI can help you with:\n- **Programming questions**\n- **College projects**\n- **Code examples**\n- **AI concepts**\n\nTry asking me anything!", 
      sender: 'ai', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, title: 'New Chat', date: 'Today' },
    { id: 2, title: 'React Help', date: 'Yesterday' },
  ]);
  
  const [selectedModel, setSelectedModel] = useState('gpt-3.5');
  const [temperature, setTemperature] = useState(0.7);
  const [apiKey, setApiKey] = useState('');

  // Handle sending messages - FIXED VERSION
  const handleSendMessage = async (data) => {
    // Handle both string and object input
    const text = typeof data === 'string' ? data : data?.text;
    
    if (!text?.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateMockAIResponse(text);
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // File size helper function
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // SMART AI RESPONSE GENERATOR - COMPLETE VERSION
  const generateMockAIResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // ========== PROGRAMMING QUESTIONS ==========
    if (input.includes('javascript') || input.includes('js ')) {
      return `# JavaScript Basics

**JavaScript** is the programming language of the web.

## Variables:
\`\`\`javascript
let name = "John";        // Can be reassigned
const age = 25;           // Cannot be reassigned
var oldWay = "avoid";     // Old method (avoid)
\`\`\`

## Functions:
\`\`\`javascript
// Regular function
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function (ES6)
const add = (a, b) => a + b;

// Usage
console.log(greet("Alice"));  // Hello, Alice!
console.log(add(5, 3));       // 8
\`\`\`

## Arrays:
\`\`\`javascript
const fruits = ['apple', 'banana', 'orange'];

// Common methods
fruits.push('grape');     // Add to end
fruits.pop();            // Remove from end
fruits.map(fruit => fruit.toUpperCase()); // Transform
fruits.filter(fruit => fruit.includes('a')); // Filter
\`\`\``;
    }
    
    // ========== REACT QUESTIONS ==========
    if (input.includes('react') || input.includes('component')) {
      return `# React Fundamentals

## Component Example:
\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
\`\`\`

## Props Example:
\`\`\`jsx
// Parent component
function App() {
  return <Welcome name="Sarah" />;
}

// Child component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

## useEffect Example:
\`\`\`jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Runs on component mount
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // Empty array = run once

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
\`\`\``;
    }
    
    // ========== PROJECT HELP ==========
    if (input.includes('project') || input.includes('college')) {
      return `# College Project Guide

## Project Structure:
\`\`\`
my-project/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── styles/        # CSS files
│   └── utils/         # Helper functions
├── public/            # Static files
├── package.json       # Dependencies
└── README.md          # Documentation
\`\`\`

## Steps to Complete:
1. **Plan** (Week 1)
   - Define features
   - Create wireframes
   - Choose technologies

2. **Develop** (Week 2-3)
   - Set up project
   - Build components
   - Add functionality

3. **Test** (Week 4)
   - Fix bugs
   - Test on different devices
   - Get feedback

4. **Document** (Week 5)
   - Write README
   - Add comments
   - Create presentation

## Grading Criteria:
✅ **Functionality** - Does it work?  
✅ **Code Quality** - Clean, organized code  
✅ **Documentation** - Clear explanations  
✅ **UI/UX** - Good design and usability  
✅ **Innovation** - Unique features`;
    }
    
    // ========== AI QUESTIONS ==========
    if (input.includes('ai') || input.includes('chatgpt') || input.includes('artificial')) {
      return `# How AI Chatbots Work

## Real AI vs This Demo:

### **Real AI (ChatGPT):**
1. **Training**: Learns from billions of documents
2. **Inference**: Processes your question
3. **Generation**: Creates response word by word
4. **Context**: Remembers conversation

### **This Demo:**
1. **Pattern Matching**: Checks keywords in your question
2. **Pre-written Responses**: Returns relevant explanations
3. **Simulation**: Looks like real AI
4. **Educational**: Shows how to build chatbot UI

## To Add Real AI:
\`\`\`javascript
// Connect to OpenAI API
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: userInput}]
  })
});
\`\`\``;
    }
    
    // ========== BASIC QUESTIONS ==========
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! 👋 I'm your AI assistant. I can help with:\n• Programming questions\n• React concepts\n• Project planning\n• Code examples\n\nWhat would you like to know?";
    }
    
    if (input.includes('how are you')) {
      return "I'm doing great! Ready to help you with your college project and programming questions. What's on your mind?";
    }
    
    if (input.includes('name')) {
      return "I'm AI ChatBot - created for college project demonstration. I can explain technical concepts and help with coding!";
    }
    
    if (input.includes('help')) {
      return "I can help with:\n📚 **Programming**: JavaScript, React, Python\n🎓 **Projects**: Planning, documentation, code\n🔧 **Technical**: Concepts, algorithms, implementation\n💡 **Ideas**: Project features, improvements\n\nJust ask your question!";
    }
    
    if (input.includes('time') || input.includes('date')) {
      return `Current: ${new Date().toLocaleString()}\n\n*Good time to code!*`;
    }
    
    if (input.includes('thank')) {
      return "You're welcome! 😊 Happy to help with your learning journey!";
    }
    
    if (input.includes('bye')) {
      return "Goodbye! 👋 Good luck with your project! Remember to:\n1. Code regularly\n2. Test thoroughly\n3. Document well\n4. Have fun!";
    }
    
    // ========== DEFAULT RESPONSES ==========
    const responses = [
      `You asked: **"${userInput}"**\n\nThat's a great question! Here's what you should consider:\n\n1. **Research** the topic thoroughly\n2. **Plan** your approach\n3. **Implement** step by step\n4. **Test** your solution\n5. **Document** your work`,
      
      `**"${userInput}"** - Excellent topic for your college project!\n\n## Key points to cover:\n• Technical implementation\n• Code examples\n• User interface\n• Testing strategy\n• Documentation`,
      
      `Regarding **${userInput}** - this involves:\n\n✅ **Frontend development** (React components)\n✅ **Backend logic** (if needed)\n✅ **Database design** (for data storage)\n✅ **API integration** (for real AI)\n✅ **Deployment** (making it live)`,
      
      `**Analysis:** "${userInput}"\n\nThis relates to:\n1. **Software Engineering** - Building reliable systems\n2. **Web Development** - Creating user interfaces\n3. **Problem Solving** - Finding optimal solutions\n4. **Project Management** - Organizing your work`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([
      { 
        id: 1, 
        text: "## 👋 Chat cleared!\n\nAsk me anything about your project.", 
        sender: 'ai', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // New chat
  const handleNewChat = () => {
    handleClearChat();
    const newConversation = {
      id: conversations.length + 1,
      title: 'Chat ' + (conversations.length + 1),
      date: 'Now'
    };
    setConversations(prev => [newConversation, ...prev]);
  };

  // Delete conversation
  const handleDeleteConversation = (id) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
  };

  // Update API key
  const handleUpdateApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('ai_chatbot_apikey', key);
    alert('API Key saved (demo mode)');
  };

  // Load API key from storage
  useEffect(() => {
    const savedKey = localStorage.getItem('ai_chatbot_apikey');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Main UI
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Sidebar 
          conversations={conversations}
          onNewChat={handleNewChat}
          onDeleteConversation={handleDeleteConversation}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
          temperature={temperature}
          onTemperatureChange={setTemperature}
          apiKey={apiKey}
          onUpdateApiKey={handleUpdateApiKey}
        />

        {/* Main Chat Area */}
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: '#343541'
        }}>
          {/* Header */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 0,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToyIcon sx={{ color: '#10a37f' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                AI ChatBot Project
              </Typography>
              <Box sx={{ 
                ml: 2, 
                px: 1.5, 
                py: 0.5, 
                bgcolor: 'rgba(16, 163, 127, 0.1)', 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Typography variant="caption" sx={{ color: '#10a37f' }}>
                  {selectedModel.toUpperCase()}
                </Typography>
                <SettingsIcon sx={{ fontSize: 14, color: '#10a37f' }} />
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                {messages.length} messages
              </Typography>
              <Typography 
                variant="caption" 
                onClick={handleClearChat}
                sx={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  cursor: 'pointer',
                  '&:hover': { color: '#10a37f' }
                }}
              >
                Clear Chat
              </Typography>
            </Box>
          </Paper>

          {/* Chat Window */}
          <ChatWindow messages={messages} isLoading={isLoading} />

          {/* Input Area */}
          <InputArea 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />

          {/* Footer */}
          <Box sx={{ 
            p: 2, 
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              AI ChatBot • College Project • React Demo
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;