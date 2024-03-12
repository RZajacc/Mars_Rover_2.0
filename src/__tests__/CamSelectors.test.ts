import fs from 'fs'
import path from 'path'

import { Window } from 'happy-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import { camSelectors } from '../Utility/camSelectors'

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
const removeAllChildNodesMock = vi.fn()

// Before each test clear html doc and mocks and call the function
beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
  vi.clearAllMocks()
  camSelectors(
    camerasUsed,
    removeAllChildNodesMock,
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

it('Should return a string with a value of camSelect id value', () => {
  
  const camerasList = document.querySelector(
    '#camera-selectors'
  ) as unknown as HTMLDivElement

  // First child is a select element with cameras as options
  const firstChild = camerasList.firstChild as HTMLSelectElement
  // Get Id value assigned to this element
  const idElement = firstChild.getAttribute('id')
  // Get Id returned by the function
  const idReturned = camSelectors(camerasUsed, removeAllChildNodesMock)

  // Test both conditions
  expect(idReturned).toBeTypeOf('string')
  expect(idElement).toBe(idReturned)
})

