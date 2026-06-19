import React, { useEffect, useRef } from 'react';
import { Box, Avatar, CircularProgress, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Message from './Message';

const ChatWindow = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box sx={{ 
      flexGrow: 1, 
      overflowY: 'auto',
      p: 3,
      backgroundColor: '#343541',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(255,255,255,0.05)',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '4px',
      }
    }}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      
      {isLoading && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          mb: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: 'rgba(68, 70, 84, 0.5)'
        }}>
          <Avatar sx={{ bgcolor: '#10a37f', width: 32, height: 32 }}>
            <SmartToyIcon fontSize="small" />
          </Avatar>
          <CircularProgress size={20} sx={{ color: '#10a37f' }} />
          <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
            AI is thinking...
          </Typography>
        </Box>
      )}
      
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatWindow;