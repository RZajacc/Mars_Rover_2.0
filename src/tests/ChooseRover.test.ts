import fs from 'fs'
import path from 'path'

import { it, expect, vi, beforeEach } from 'vitest'
import { Window } from 'happy-dom'

import { chooseRover } from '../Utility/ChooseRover'

const htmlDocPath = path.join(process.cwd() + '/public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document
document.write(htmlDocumentContent)
vi.stubGlobal('document', document)

beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
})

it('Should not do anything yet', () => {
  // ! Probably requires a mock of this function
  // chooseRover()
  // expect('test').toBe('test')
})
