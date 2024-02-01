import fs from 'fs'
import path from 'path'

import { it, describe, expect, vi, beforeEach } from 'vitest'

import {
  removeAllChildNodes,
  cleanAllDynamicContent
} from './ClearDynamicContent'
import { Window } from 'happy-dom'

const htmlDocPath = path.join(process.cwd() + '/public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document
vi.stubGlobal('document', document)

beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
})

describe('removeAllChildNodes', () => {
  it('Should not throw an error if provided element doesnt contain any childnodes initially', () => {
    const roverInfo = document.querySelector(
      '#rover-info'
    )! as unknown as HTMLDivElement
    removeAllChildNodes(roverInfo)
    const childEl = roverInfo.firstElementChild

    expect(childEl).toBeNull()
  })
  it('Should remove all childnodes from a given HTMLElement', () => {
    const roverInfo = document.querySelector(
      '#rover-info'
    )! as unknown as HTMLDivElement
    const pEl = document.createElement('p') as unknown as HTMLParagraphElement
    roverInfo.appendChild(pEl)

    removeAllChildNodes(roverInfo)
    const childEl = roverInfo.firstElementChild

    expect(childEl).toBeNull()
  })
})

describe('cleanAllDynamicContent()', () => {
  it('Make it one by one or for randomly selected one', () => {})
  it('Should change camInfo paragraph to contain an empty string', () => {
    cleanAllDynamicContent()
    const camInfo = document.querySelector(
      '#cameras-info'
    )! as unknown as HTMLParagraphElement

    expect(camInfo.innerHTML).toBe('')
  })
})
