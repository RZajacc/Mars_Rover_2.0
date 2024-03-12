import path from 'path'
import fs from 'fs'

import { Window } from 'happy-dom'
import { vi, beforeEach, it, expect } from 'vitest'

import { displayEmptyRoverErr } from '../Utility/displayEmptyRoverErr'


const htmlDocPath = path.join(process.cwd(), 'public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document
vi.stubGlobal('document', document)

// Mock the cleaning function to make sure its called
const cleanAllDynamicContentMock = vi.fn()

beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
  vi.clearAllMocks()
})

it('It should call the function cleaning all dynamically generated content at first', () => {
    // Prepare the message to pass to the function
    const messageToDisplay = 'test'

    // Call the function
    displayEmptyRoverErr(messageToDisplay, cleanAllDynamicContentMock)

    // Check if cleanContent is being called
    expect(cleanAllDynamicContentMock).toHaveBeenCalledOnce()
  })
  it('Should contain a child of p element after being called', () => {
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
  it('Should contain a text provided as an argument to it', () => {
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