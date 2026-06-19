import React from 'react';
import { Box, Typography, Avatar, Paper, IconButton } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import VoiceOutput from './VoiceOutput';

const Message = ({ message }) => {
  const isAI = message.sender === 'ai';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    alert('Copied to clipboard!');
  };

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      mb: 3,
      flexDirection: isAI ? 'row' : 'row-reverse'
    }}>
      <Avatar sx={{ 
        bgcolor: isAI ? '#10a37f' : '#5436da',
        width: 36, 
        height: 36,
        mt: 0.5
      }}>
        {isAI ? <SmartToyIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
      </Avatar>

      <Box sx={{ 
        flexGrow: 1,
        maxWidth: '800px',
        alignSelf: 'flex-start'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          mb: 0.5,
          justifyContent: isAI ? 'flex-start' : 'flex-end'
        }}>
          <Typography variant="caption" sx={{ 
            fontWeight: 600, 
            color: isAI ? '#10a37f' : '#5436da'
          }}>
            {isAI ? 'AI Assistant' : 'You'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            {message.timestamp}
          </Typography>
          
          {/* ✅ CORRECT: Voice and Copy buttons INSIDE the function */}
          {isAI && (
            <>
              <VoiceOutput text={message.text} />
              <IconButton 
                size="small" 
                onClick={handleCopy}
                sx={{ 
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': { color: '#10a37f' }
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
        
        <Paper 
          elevation={0}
          sx={{ 
            p: 2.5,
            borderRadius: 2,
            bgcolor: isAI ? 'rgba(68, 70, 84, 0.5)' : 'rgba(84, 54, 218, 0.1)',
            border: isAI ? 'none' : '1px solid rgba(84, 54, 218, 0.3)'
          }}
        >
          <Typography 
            component="div" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6,
              '& pre': { 
                mt: 1, 
                mb: 1,
                p: 2,
                borderRadius: 1,
                overflow: 'auto'
              },
              '& code': {
                fontFamily: 'monospace',
                bgcolor: 'rgba(0,0,0,0.2)',
                px: 0.5,
                py: 0.2,
                borderRadius: 0.5
              },
              '& p': { margin: '0.5em 0' },
              '& ul, & ol': { pl: 2, my: 1 },
              '& h1, & h2, & h3': { mt: 1, mb: 0.5 }
            }}
          >
            <ReactMarkdown
              components={{
                code: CodeBlock
              }}
            >
              {message.text}
            </ReactMarkdown>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;