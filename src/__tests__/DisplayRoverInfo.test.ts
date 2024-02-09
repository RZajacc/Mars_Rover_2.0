import path from 'path'
import fs from 'fs'

import { Window } from 'happy-dom'
import { vi, beforeEach, describe, it, expect } from 'vitest'

import {
  displayEmptyRoverErr,
  displayRoverInfo
} from '../Utility/DisplayRoverInfo'
import { missionManifest } from '../types/fetchedTypes'

const htmlDocPath = path.join(process.cwd(), 'public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document
vi.stubGlobal('document', document)

// Mock the cleaning function to make sure its called
const cleanAllDynamicContentMock = vi.fn()

// Since both functions depend on each other I need to break this dependency by mock
vi.mock('../Utility/ChooseRover.ts')

beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
  vi.clearAllMocks()
})

describe('displayEmptyRoverErr', () => {
  it('It should call the function cleaning all dynamically generated content at first', () => {
    // Prepare the message to pass to the function
    const messageToDisplay = 'test'

    // Call the function
    displayEmptyRoverErr(messageToDisplay, cleanAllDynamicContentMock)

    // Check if cleanContent is being called
    expect(cleanAllDynamicContentMock).toHaveBeenCalledOnce()
  })
  it('Should have a child of p element after being called', () => {
    // Prepare the message to pass to the function
    const messageToDisplay = 'test'

    // Get a HTML Element containing error
    const roverInfo = document.querySelector(
      '#rover-info'
    )! as unknown as HTMLDivElement
    // Call the function
    displayEmptyRoverErr(messageToDisplay, cleanAllDynamicContentMock)

    // Expect rover info to have only 1 child
    expect(roverInfo.childNodes.length).toBe(1)

    // Get this child element
    const firstChild = roverInfo.firstChild as HTMLElement

    // Expect that this element is actually of paragraph type
    expect(firstChild.tagName).toBe('P')
  })
  it('Should contain a text provided as an argument', () => {
    // Prepare the message to pass to the function
    const messageToDisplay = 'test'

    // Get a HTML Element containing error
    const roverInfo = document.querySelector(
      '#rover-info'
    )! as unknown as HTMLDivElement
    // Call the function
    displayEmptyRoverErr(messageToDisplay, cleanAllDynamicContentMock)

    // Get this child element
    const firstChild = roverInfo.firstChild as HTMLElement

    expect(firstChild.innerHTML).toBe(messageToDisplay)
  })
  it('Should display text in red and aligned to center', () => {
    // Prepare the message to pass to the function
    const messageToDisplay = 'test'

    // Get a HTML Element containing error
    const roverInfo = document.querySelector(
      '#rover-info'
    )! as unknown as HTMLDivElement
    // Call the function
    displayEmptyRoverErr(messageToDisplay, cleanAllDynamicContentMock)

    // Get this child element
    const firstChild = roverInfo.firstChild as HTMLElement

    // CSS class to to be tested
    const classes = 'text-align:center; color:red'
    expect(firstChild.getAttribute('style')).toBe(classes)
  })
})

describe('displayRoverInfo()', () => {
  // Data and function mocks necessary only for this function
  const data: missionManifest = {
    landing_date: '12',
    launch_date: '34',
    max_date: '56',
    max_sol: '78',
    name: 'curiosity',
    status: 'active',
    total_photos: 100,
    photos: [{ earth_date: '123', sol: 1, total_photos: 123, cameras: [''] }]
  }
  const roverName = 'Curiosity'

  // Mock of remaning functions specific only for this method
  const removeAllChildNodesMock = vi.fn()
  const fetchBasicMock = vi.fn()
  const fetchExpandedMock = vi.fn()
  const displaySolDayInfoMock = vi.fn()

  it('It should call the function cleaning all dynamically generated content at first', () => {
    // Call the function
    displayRoverInfo(
      data,
      roverName,
      cleanAllDynamicContentMock,
      removeAllChildNodesMock,
      fetchBasicMock,
      fetchExpandedMock,
      displaySolDayInfoMock
    )

    // Check if cleanContent is being called
    expect(cleanAllDynamicContentMock).toHaveBeenCalledOnce()
  })

  it('Should create a paragraph element containg rover desription', () => {
    const roverInfo = document.querySelector(
      '#rover-info'
    ) as unknown as HTMLDivElement
    // Call the function
    displayRoverInfo(
      data,
      roverName,
      cleanAllDynamicContentMock,
      removeAllChildNodesMock,
      fetchBasicMock,
      fetchExpandedMock,
      displaySolDayInfoMock
    )

    const firstChild = roverInfo.firstChild as HTMLElement

    // Check if paragraph element was generated
    expect(firstChild.tagName).toBe('P')

    // Check if it contains the required information
    expect(firstChild.innerHTML).toContain(data.name)
    expect(firstChild.innerHTML).toContain(data.max_sol)
    expect(firstChild.innerHTML).toContain(data.total_photos)
    expect(firstChild.innerHTML).toContain(data.status)
  })
})
