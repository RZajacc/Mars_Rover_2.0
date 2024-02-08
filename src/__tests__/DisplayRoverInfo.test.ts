import path from 'path'
import fs from 'fs'

import { Window } from 'happy-dom'
import { vi, beforeEach, describe, it, expect } from 'vitest'

import { displayEmptyRoverErr } from '../Utility/DisplayRoverInfo'

const htmlDocPath = path.join(process.cwd(), 'public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document
vi.stubGlobal('document', document)

beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
  vi.clearAllMocks()
})

describe('displayEmptyRoverErr', () => {
  it('It should call the function cleaning all dynamically generated content at first', () => {
    // Prepare the message to pass to the function
    const messageToDisplay = 'test'

    // Since both functions depend on each other I need to break this dependency by mock
    vi.mock('../Utility/ChooseRover.ts')
    vi.mock('../Utility/DisplayCameraSelectors.ts')
    // Mock the cleaning function to make sure its called
    const cleanAllDynamicContentMock = vi.fn()

    // Call the function
    displayEmptyRoverErr(messageToDisplay, cleanAllDynamicContentMock)

    // Check if cleanContent is being called
    expect(cleanAllDynamicContentMock).toHaveBeenCalledOnce()
  })
})
