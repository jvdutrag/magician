import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

import '@fontsource/roboto/300.css'
import './index.css'

import App from './App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#2b2b2b'
    },
    primary: {
      main: '#ffd000',
      dark: '#ffac00'
    }
  }
})

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)


