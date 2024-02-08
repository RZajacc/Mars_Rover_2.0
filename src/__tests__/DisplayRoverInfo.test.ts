import path from 'path'
import fs from 'fs'

import { Window } from 'happy-dom'
import { vi, beforeEach, describe, it } from 'vitest'

import { displayEmptyRoverErr } from '../Utility/DisplayRoverInfo'

const htmlDocPath = path.join(process.cwd(), 'public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document
vi.stubGlobal('document', document)

beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
})

describe('displayEmptyRoverErr', () => {
  it('It should call the function cleaning all dynamically generated content at first', () => {})
})
