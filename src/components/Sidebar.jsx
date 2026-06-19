import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Divider,
  TextField,
  Slider,
  Switch,
  Chip,
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LightModeIcon from '@mui/icons-material/LightMode';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({
  conversations,
  onNewChat,
  onDeleteConversation,
  selectedModel,
  onSelectModel,
  temperature,
  onTemperatureChange,
  apiKey,
  onUpdateApiKey
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [localApiKey, setLocalApiKey] = useState(apiKey);

  const models = [
    { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast & efficient' },
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable' },
    { id: 'gemini', name: 'Gemini Pro', description: 'Google AI' },
    { id: 'claude', name: 'Claude', description: 'Anthropic' }
  ];

  const handleSaveApiKey = () => {
    onUpdateApiKey(localApiKey);
    setShowSettings(false);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: '#202123',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.9)'
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<AddIcon />}
            onClick={onNewChat}
            sx={{
              justifyContent: 'flex-start',
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.9)',
              textTransform: 'none',
              py: 1.2,
              mb: 2,
              '&:hover': {
                borderColor: '#10a37f',
                backgroundColor: 'rgba(16, 163, 127, 0.1)'
              }
            }}
          >
            New Chat
          </Button>
        </Box>

        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
          <Typography
            variant="caption"
            sx={{
              px: 2,
              color: 'rgba(255,255,255,0.5)',
              display: 'block',
              mb: 1
            }}
          >
            Today
          </Typography>
          
          <List dense>
            {conversations.slice(0, 5).map((conv) => (
              <ListItem
                key={conv.id}
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => onDeleteConversation(conv.id)}
                    sx={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemButton sx={{ borderRadius: 1, mx: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <HistoryIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={conv.title}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.8)'
                    }}
                    secondary={conv.date}
                    secondaryTypographyProps={{
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.4)'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              AI Model
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {models.map((model) => (
                <Chip
                  key={model.id}
                  label={model.name}
                  size="small"
                  onClick={() => onSelectModel(model.id)}
                  color={selectedModel === model.id ? "primary" : "default"}
                  sx={{
                    backgroundColor: selectedModel === model.id ? '#10a37f' : 'rgba(255,255,255,0.1)',
                    color: selectedModel === model.id ? 'white' : 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      backgroundColor: selectedModel === model.id ? '#0d8c6d' : 'rgba(255,255,255,0.15)'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Temperature: {temperature.toFixed(1)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                {temperature < 0.3 ? 'Precise' : temperature < 0.7 ? 'Balanced' : 'Creative'}
              </Typography>
            </Box>
            <Slider
              value={temperature}
              onChange={(e, newValue) => onTemperatureChange(newValue)}
              min={0}
              max={1}
              step={0.1}
              sx={{
                color: '#10a37f',
                '& .MuiSlider-thumb': {
                  backgroundColor: '#10a37f'
                }
              }}
            />
          </Box>

          <Button
            fullWidth
            startIcon={<SettingsIcon />}
            onClick={() => setShowSettings(true)}
            sx={{
              justifyContent: 'flex-start',
              color: 'rgba(255,255,255,0.7)',
              textTransform: 'none',
              py: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            Settings
          </Button>
        </Box>

        <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#10a37f' }}>
              <SmartToyIcon fontSize="small" />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                AI ChatBot
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                College Project
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {showSettings && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 280,
            width: 'calc(100% - 280px)',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 1300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={() => setShowSettings(false)}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              backgroundColor: '#202123',
              borderRadius: 2,
              p: 3,
              width: '90%',
              maxWidth: 500,
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: 'white' }}>
                Settings
              </Typography>
              <IconButton onClick={() => setShowSettings(false)} sx={{ color: 'rgba(255,255,255,0.5)' }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: 'rgba(255,255,255,0.8)' }}>
                API Configuration
              </Typography>
              <TextField
                fullWidth
                type="password"
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                placeholder="Enter your API key..."
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    '&:hover fieldset': { borderColor: '#10a37f' }
                  },
                  '& .MuiInputBase-input': {
                    color: 'rgba(255,255,255,0.9)'
                  }
                }}
              />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mt: 1, display: 'block' }}>
                Get API keys from OpenAI, Google AI Studio, or Anthropic
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Model Settings
              </Typography>
              <List dense>
                {models.map((model) => (
                  <ListItemButton
                    key={model.id}
                    selected={selectedModel === model.id}
                    onClick={() => onSelectModel(model.id)}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(16, 163, 127, 0.2)'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <PsychologyIcon sx={{ color: '#10a37f' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={model.name}
                      secondary={model.description}
                      primaryTypographyProps={{ color: 'rgba(255,255,255,0.9)' }}
                      secondaryTypographyProps={{ color: 'rgba(255,255,255,0.5)' }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                onClick={() => setShowSettings(false)}
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' }
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSaveApiKey}
                sx={{
                  backgroundColor: '#10a37f',
                  '&:hover': { backgroundColor: '#0d8c6d' }
                }}
              >
                Save Settings
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Sidebar;