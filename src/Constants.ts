import { Line } from './Types'

const defaultLineStyle: Line = {
  name: 'default',
  method: (line: string, name: string) => true,
  style: {
    color: '#ffffff'
  }
}

const lineStyles: Line[] = [
  {
    name: 'characterSays',
    method: (line: string, name: string) => line.startsWith(`${name} diz:`),
    style: {
      color: '#ffffff'
    }
  },
  {
    name: 'low',
    method: (line: string, name: string) => line.includes('[baixo]'),
    style: {
      color: '#bbbbbb'
    }
  },
  {
    name: 'money',
    method: (line: string, name: string) => line.includes('pagou') || line.includes('recebeu') || line.includes('transferiu') || line.includes('sacou') || line.includes('depositou'),
    style: {
      color: '#008000'
    }
  },
  {
    name: 'whisper',
    method: (line: string, name: string) => line.includes('sussurra') && !line.includes('(Carro)'),
    style: {
      color: '#eda841'
    }
  },
  {
    name: 'carWhisper',
    method: (line: string, name: string) => line.includes('(Carro)') && line.includes('sussurra'),
    style: {
      color: '#fdfc1c'
    }
  },
  {
    name: 'firstRadio',
    method: (line: string, name: string) => line.startsWith('** [S: 1'),
    style: {
      color: '#f9e687'
    }
  },
  {
    name: 'secondRadio',
    method: (line: string, name: string) => line.startsWith('** [S:'),
    style: {
      color: '#857b48'
    }
  },
  {
    name: 'departamentalRadio',
    method: (line: string, name: string) => line.startsWith('** [') && line.endsWith('**'),
    style: {
      color: '#cecc15'
    }
  },
  {
    name: 'phone',
    method: (line: string, name: string) => line.includes('(telefone)'),
    style: {
      color: '#e7e700'
    }
  },
  {
    name: 'otherCharacterSays',
    method: (line: string, name: string) => line.includes('diz:') && !line.startsWith(`${name} diz:`),
    style: {
      color: '#cccccc'
    }
  },
  {
    name: 'action',
    method: (line: string, name: string) => line.startsWith('* ') || line.startsWith('> '),
    style: {
      color: '#c2a2da'
    }
  }
]

const fontSizes = {
  min: 12,
  max: 18
}

export { lineStyles, fontSizes, defaultLineStyle }