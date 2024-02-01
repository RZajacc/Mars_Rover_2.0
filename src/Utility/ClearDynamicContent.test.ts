import fs from 'fs'
import path from 'path'

import { it, describe, expect, vi } from 'vitest'

import { removeAllChildNodes } from './ClearDynamicContent'
import { Window } from 'happy-dom'

const htmlDocPath = path.join(process.cwd() + '/public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document
document.write(htmlDocumentContent)
vi.stubGlobal('document', document)

it('Should remove all childnodes', () => {
  const roverInfo: HTMLDivElement = document.querySelector('#rover-info')!
  removeAllChildNodes(roverInfo)
  const childEl = roverInfo.firstElementChild

  expect(childEl).toBeNull()
})
