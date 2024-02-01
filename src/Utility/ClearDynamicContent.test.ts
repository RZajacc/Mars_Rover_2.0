import fs from 'fs'
import path from 'path'

import { it, describe, expect, vi, beforeEach } from 'vitest'

import { removeAllChildNodes } from './ClearDynamicContent'
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

it('Should remove all childnodes', () => {
  const roverInfo = document.querySelector(
    '#rover-info'
  )! as unknown as HTMLDivElement
  removeAllChildNodes(roverInfo)
  const childEl = roverInfo.firstElementChild

  expect(childEl).toBeNull()
})
