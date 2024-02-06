import fs from 'fs'
import path from 'path'

import { it, describe, expect, vi } from 'vitest'
import { Window } from 'happy-dom'

import { chooseRover } from '../Utility/ChooseRover'
import { displayEmptyRoverErr } from '../Utility/DisplayRoverInfo'
import { fetchManifest } from '../Utility/FetchManifest'

const htmlDocPath = path.join(process.cwd() + '/public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document
document.write(htmlDocumentContent)
vi.stubGlobal('document', document)

describe('chooseRover function', () => {
  it('should display an error message when no rover is selected', () => {
    const displayEmptyRoverErrMock = vi.fn()
    const fetchManifestMock = vi.fn()

    const roverSelect = document.querySelector(
      '#rover-select'
    )! as unknown as HTMLSelectElement
    // Call the function under test
    chooseRover(roverSelect, displayEmptyRoverErrMock, fetchManifestMock)

    // Trigger change event without selecting a rover
    roverSelect.addEventListener('change', () => {
      console.log('Test')
    })

    // Expect displayEmptyRoverErr to be called with the correct message
    expect(displayEmptyRoverErrMock).toHaveBeenCalledWith(
      'Nothing to display! Please select a rover!'
    )

    // Expect fetchManifest not to be called
    expect(fetchManifestMock).not.toHaveBeenCalled()
  })
})
