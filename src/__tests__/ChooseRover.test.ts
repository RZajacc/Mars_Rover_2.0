import fs from 'fs'
import path from 'path'

import { it, expect, vi, beforeEach } from 'vitest'
import { Window } from 'happy-dom'

import { chooseRover } from '../Utility/ChooseRover'
import { cleanAllDynamicContent } from '../Utility/ClearDynamicContent'

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

it('should call displayEmptyRoverErr function if no value in selected field is provided', () => {
  // Query the select element from the document
  const roverSelect = document.querySelector(
    '#rover-select'
  ) as unknown as HTMLSelectElement

  // Mock functions for testing - since all of them will be tested individually I will leave implementation blank
  const displayEmptyRoverErrMock = vi.fn()
  const fetchManifestMock = vi.fn()

  // Call the chooseRover function with mocked functions
  chooseRover(
    roverSelect,
    displayEmptyRoverErrMock,
    fetchManifestMock,
    cleanAllDynamicContent
  )

  // Value to be provdied to select element
  const testedValue = ''
  // Loop through the options and set the selected property to true for the desired option
  // Since Happy-dom doesn't allow to assign value directly I had to change option to selected manually
  Array.from(roverSelect.options).forEach((option) => {
    if (option.value === testedValue) {
      option.selected = true
    }
  })
  // Trigger 'change' event on the <select> element
  const changeEvent = new window.Event('change') as unknown as Event
  roverSelect.dispatchEvent(changeEvent)

  // Verify that select element value was actually changed
  expect(roverSelect.value).toBe(testedValue)
  // Verify that displayEmptyRoverErr was actually called
  expect(displayEmptyRoverErrMock).toHaveBeenCalledOnce()

  // Verify that fetchManifest was not called
  expect(fetchManifestMock).not.toHaveBeenCalled()
})

it('should call fetchManifst function if other value than empty string is selected', () => {
  // Query the select element from the document
  const roverSelect = document.querySelector(
    '#rover-select'
  ) as unknown as HTMLSelectElement

  // Mock functions for testing - since all of them will be tested individually I will leave implementation blank
  const displayEmptyRoverErrMock = vi.fn()
  const fetchManifestMock = vi.fn()

  // Call the chooseRover function with mocked functions
  chooseRover(
    roverSelect,
    displayEmptyRoverErrMock,
    fetchManifestMock,
    cleanAllDynamicContent
  )

  // Value to be provdied to select element
  const testedValue = 'curiosity'
  // Loop through the options and set the selected property to true for the desired option
  // Since Happy-dom doesn't allow to assign value directly I had to change option to selected manually
  Array.from(roverSelect.options).forEach((option) => {
    if (option.value === testedValue) {
      option.selected = true
    }
  })
  // Trigger 'change' event on the <select> element
  const changeEvent = new window.Event('change') as unknown as Event
  roverSelect.dispatchEvent(changeEvent)

  // Verify that select element value was actually changed
  expect(roverSelect.value).toBe(testedValue)
  // Verify that displayEmptyRoverErr was not called
  expect(displayEmptyRoverErrMock).not.toHaveBeenCalled()

  // Verify that fetchManifest was called
  expect(fetchManifestMock).toHaveBeenCalledOnce()
})
