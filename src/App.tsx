import React from 'react'
import {
  Container, Grid, Box, FormControl, InputAdornment,
  InputLabel, IconButton, OutlinedInput, TextField,
  Checkbox, FormControlLabel, Button
} from '@mui/material'
import { MuiColorInput } from 'mui-color-input'

import {
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material'

import * as htmlToImage from 'html-to-image'

import { fontSizes, lineStyles, defaultLineStyle } from './Constants'
import { Line } from './Types'

import Logo from './logo.png'

function App() {
  const [fontSize, setFontSize] = React.useState(fontSizes.min)
  const [color, setColor] = React.useState<string>('#000000')
  const [name, setName] = React.useState<string>('')
  const [input, setInput] = React.useState<string>('')
  const [output, setOutput] = React.useState<Line[]>([])
  
  const outputRef = React.useRef<HTMLElement>(null)

  const [isColorDisabled, setIsColorDisabled] = React.useState(false)
  const [validationError, setValidationError] = React.useState(false)

  const isValid = name && input

  const buildGlobalLineStyle = () => {
    return {
      backgroundColor: isColorDisabled ? 'transparent' : color,
      padding: `${fontSize / 25}rem`,
      width: 'fit-content',
      whiteSpace: 'pre'
    }
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsColorDisabled(event.target.checked)

    if (event.target.checked) {
      setColor('')
    } else {
      setColor('#000000')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)

    const textSeparatedByLines = event.target.value.split('\n')

    const output: Line[] = []

    for (let line of textSeparatedByLines) {
      line = line.replace(/^\[\d{2}:\d{2}:\d{2}\]/, '').trim()

      if (!line) {
        continue
      }

      const lineStyle = lineStyles.find((lineStyle) => lineStyle.method(line, name)) || defaultLineStyle
      output.push({
        ...lineStyle,
        text: line
      })
    }

    setOutput(output)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleColorChange = (color: string) => {
    setColor(color)
  }

  const handleFontSizeActionClick = (action: string) => {
    if (action === 'increase') {
      if (fontSize < fontSizes.max) {
        setFontSize(fontSize + 1)
      }
    } else if (action === 'decrease') {
      if (fontSize > fontSizes.min) {
        setFontSize(fontSize - 1)
      }
    }
  }

  const onButtonClick = async () => {
    if (!outputRef.current) {
      return
    }

    if (!isValid) {
      return setValidationError(true)
    }

    const dataUrl = await htmlToImage.toPng(outputRef.current)
 
    const link = document.createElement('a')
    link.download = `Chatlog-${Date.now()}.png`
    link.href = dataUrl
    link.click()
  }

  return (
    <Container maxWidth="md" sx={{ mb: 2 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box component="img" src={Logo} alt="GTA World" sx={{ textAlign: 'center' }} />
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              onChange={handleNameChange}
              variant="outlined"
              label="Nome do seu personagem *"
              fullWidth
              placeholder="Ex: Nome Sobrenome"
              value={name}
              error={validationError && !name}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="teste">Tamanho da fonte</InputLabel>
              <OutlinedInput
                label="Tamanho da fonte"
                notched
                value={fontSize}
                disabled={true}
                type="text"
                startAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleFontSizeActionClick('increase')}
                      disabled={fontSize >= fontSizes.max}
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleFontSizeActionClick('decrease')}
                      disabled={fontSize <= fontSizes.min}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2
          }}
          >
            <Box sx={{ width: '50%' }}>
              <MuiColorInput
                value={color}
                onChange={handleColorChange}
                variant="outlined"
                label="Cor do fundo"
                isAlphaHidden
                format="hex"
                fullWidth
                disabled={isColorDisabled}
              />
            </Box>
            <Box>
              <FormControlLabel
                label="Sem fundo"
                control={
                  <Checkbox
                    checked={isColorDisabled}
                    onChange={handleCheckboxChange}
                  />
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              label="Chatlog *"
              fullWidth
              placeholder="Insira seu chatlog aqui"
              value={!name ? 'Preencha o nome primeiro!' : input}
              multiline
              minRows={10}
              maxRows={10}
              disabled={!name}
              error={validationError && !input}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onButtonClick}
              disabled={!input || !name}
            >
              Baixar imagem
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: `${fontSize}px`,
            fontFamily: 'Arial, sans-serif',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            letterSpacing: 0,
            lineHeight: 0,
            fontWeight: 700,
            fontSmooth: 'none !important',
            maxWidth: '600px'
          }}
          id="output"
          ref={outputRef}
        >
          {output.map((line, index) => (
            <Box
              key={index}
              component="span"
              sx={{
                ...line.style,
                ...buildGlobalLineStyle()
              }}
            >
              {line.text}
            </Box>
          ))}
        </Box>
      </Grid>
    </Container>
  )
}

export default App
