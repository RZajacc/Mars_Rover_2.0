import fs from 'fs'
import path from 'path'

import { it, describe, expect, vi } from 'vitest'
import { Window } from 'happy-dom'

import { chooseRover } from '../Utility/ChooseRover'

const htmlDocPath = path.join(process.cwd() + '/public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document
document.write(htmlDocumentContent)
vi.stubGlobal('document', document)

it('Should not do anything yet', () => {
  //   chooseRover()
  // expect('test').toBe('test')
})
