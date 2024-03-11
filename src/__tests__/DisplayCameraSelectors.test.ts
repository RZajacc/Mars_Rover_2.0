import fs from 'fs'
import path from 'path'

import { Window } from 'happy-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import { displayCameraSelectors } from '../Utility/camSelectors'

// Get a path to html document and get it's content to string
const htmlDocPath = path.join(process.cwd(), 'public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

// Create happy-dom's instance of a Window object and exctract document
const window = new Window()
const document = window.document

// Add this document as global object to testing library
vi.stubGlobal('document', document)

// Mock the data and functions called later
const camerasUsed = ['ENTRY']
const roverName = 'curiosity'
const selectedSolarDay = '1'
const pagesCount = '1'
const removeAllChildNodesMock = vi.fn()
const fetchBasicMock = vi.fn()
const fetchExpandedMock = vi.fn()

// Before each test clear html doc and mocks and call the function
beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
  vi.clearAllMocks()
  displayCameraSelectors(
    camerasUsed,
    roverName,
    selectedSolarDay,
    pagesCount,
    removeAllChildNodesMock,
    fetchBasicMock,
    fetchExpandedMock
  )
})

it('Should call cleaner function once and have one select element as a child node', () => {
  const camerasList = document.querySelector(
    '#camera-selectors'
  ) as unknown as HTMLDivElement

  const firstChild = camerasList.firstChild as HTMLElement

  //   Check calling cleaner function
  expect(removeAllChildNodesMock).toBeCalledTimes(1)
  //   Check child element type
  expect(firstChild.tagName).toBe('SELECT')
})

it('Should contain two display options. All cameras and one provided in sample data', () => {
  const camerasList = document.querySelector(
    '#camera-selectors'
  ) as unknown as HTMLDivElement

  const firstChild = camerasList.firstChild as HTMLSelectElement

  //   Expect to have two options
  expect(firstChild.options.length).toBe(2)

  //   Expect first one to be All cameras
  expect(firstChild.options[0].text).toBe('All cameras')

  //   Expect other value to be equal to provided in sample data
  expect(firstChild.options[1].value).toBe(camerasUsed[0])
})

it('Should call basic fetch function if select option equals All, and fetchExpanded otherwise', () => {
  const camerasList = document.querySelector(
    '#camera-selectors'
  ) as unknown as HTMLDivElement

  const camSel = camerasList.firstChild as HTMLSelectElement

  //   All should be a default value for select so it will be called initially
  expect(fetchBasicMock).toBeCalledTimes(1)

  //   Select another option in select field
  Array.from(camSel.options).forEach((option) => {
    if (option.value === camerasUsed[0]) {
      option.selected = true
    }
  })

  //   Prepare event with proper type and fire it to trigger function
  const changeEvent = new window.Event('change') as unknown as Event
  camSel.dispatchEvent(changeEvent)

  //   Expect that the value is actually changed from All
  expect(camSel.value).toBe(camerasUsed[0])

  //   Expect that fetchExpanded is called in this case
  expect(fetchExpandedMock).toBeCalledTimes(1)
})
