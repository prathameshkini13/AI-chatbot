import React, { useState, useRef } from 'react';
import { 
  Paper, TextField, IconButton, Box, Tooltip,
  Badge, Menu, MenuItem, ListItemIcon, Typography 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import MoodIcon from '@mui/icons-material/Mood';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';

const InputArea = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((input.trim() || files.length > 0) && !isLoading) {
      const messageWithFiles = {
        text: input,
        files: files.map(f => ({
          name: f.name,
          type: f.type,
          size: f.size
        }))
      };
      onSendMessage(messageWithFiles);
      setInput('');
      setFiles([]);
    }
  };

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const triggerFileInput = (fileType = '*') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = fileType;
      fileInputRef.current.click();
    }
    handleMenuClose();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ 
      p: 2,
      borderTop: '1px solid rgba(255,255,255,0.1)',
      backgroundColor: '#343541'
    }}>
      {/* File Display Area */}
      {files.length > 0 && (
        <Box sx={{ 
          mb: 2, 
          p: 1, 
          bgcolor: 'rgba(68, 70, 84, 0.5)',
          borderRadius: 1
        }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'block' }}>
            Attached files ({files.length}):
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {files.map((file, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'rgba(16, 163, 127, 0.1)',
                  border: '1px solid rgba(16, 163, 127, 0.3)'
                }}
              >
                {file.type.startsWith('image/') ? (
                  <ImageIcon fontSize="small" sx={{ color: '#10a37f' }} />
                ) : file.type === 'application/pdf' ? (
                  <PictureAsPdfIcon fontSize="small" sx={{ color: '#ff6b6b' }} />
                ) : (
                  <DescriptionIcon fontSize="small" sx={{ color: '#4dabf7' }} />
                )}
                <Typography variant="caption" sx={{ 
                  color: 'rgba(255,255,255,0.9)',
                  maxWidth: '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {file.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  ({formatFileSize(file.size)})
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveFile(index)}
                  sx={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Paper>
            ))}
          </Box>
        </Box>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        style={{ display: 'none' }}
      />

      {/* Main Input Form */}
      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          p: '4px 16px',
          borderRadius: 4,
          bgcolor: 'rgba(64,65,79,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.2)'
          }
        }}
      >
        {/* File Menu Button */}
        <Tooltip title="Attach Files">
          <IconButton 
            onClick={handleMenuOpen}
            sx={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <Badge badgeContent={files.length} color="primary">
              <AttachFileIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* File Type Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => triggerFileInput('image/*')}>
            <ListItemIcon>
              <ImageIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Image</Typography>
          </MenuItem>
          <MenuItem onClick={() => triggerFileInput('.pdf')}>
            <ListItemIcon>
              <PictureAsPdfIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">PDF Document</Typography>
          </MenuItem>
          <MenuItem onClick={() => triggerFileInput('.txt,.doc,.docx')}>
            <ListItemIcon>
              <DescriptionIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Text/Document</Typography>
          </MenuItem>
          <MenuItem onClick={() => triggerFileInput('*')}>
            <ListItemIcon>
              <AttachFileIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Any File</Typography>
          </MenuItem>
        </Menu>
        
        {/* Text Input */}
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message AI ChatBot or attach files..."
          disabled={isLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' }
            },
            '& .MuiInputBase-input': {
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.95rem'
            }
          }}
        />
        
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <VoiceInput onTranscript={(text) => setInput(prev => prev + ' ' + text)} />
          
          <Tooltip title="Emoji">
            <IconButton sx={{ color: 'rgba(255,255,255,0.5)' }}>
              <MoodIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Send Message">
            <IconButton 
              type="submit"
              disabled={(!input.trim() && files.length === 0) || isLoading}
              sx={{ 
                color: (input.trim() || files.length > 0) ? '#10a37f' : 'rgba(255,255,255,0.3)',
                '&:hover': { 
                  backgroundColor: 'rgba(16, 163, 127, 0.1)' 
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
      
      {/* Instructions */}
      <Box sx={{ 
        mt: 1, 
        textAlign: 'center' 
      }}>
        <small style={{ 
          color: 'rgba(255,255,255,0.4)', 
          fontSize: '0.75rem' 
        }}>
          Press Enter to send • Attach files: Images, PDFs, Documents
        </small>
      </Box>
    </Box>
  );
};

// Voice Input Component
const VoiceInput = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        onTranscript(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      setRecognition(recognition);
      setIsListening(true);
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <Tooltip title={isListening ? "Stop Recording" : "Voice Input"}>
      <IconButton 
        onClick={isListening ? stopListening : startListening}
        sx={{ 
          color: isListening ? '#ff6b6b' : 'rgba(255,255,255,0.5)',
          animation: isListening ? 'pulse 1.5s infinite' : 'none'
        }}
      >
        <MicIcon />
      </IconButton>
    </Tooltip>
  );
};

export default InputArea;