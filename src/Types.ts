import { CSSProperties } from 'react'

export type Line = {
    name: string
    text?: string
    method: (line: string, name: string) => boolean
    style: CSSProperties
}
