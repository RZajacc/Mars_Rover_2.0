import path from 'path'
import fs from 'fs'

import { Window } from 'happy-dom'
import { vi, beforeEach, describe, it, expect } from 'vitest'

import {
  displayRoverInfo
} from '../Utility/displayRoverInfo'
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

  // Before each test in this suite mock the helping functions and call main one
  beforeEach(() => {
    // Call the function
    displayRoverInfo(
      data,
      removeAllChildNodesMock,
    )
  })

  it('It should call the function cleaning all dynamically generated content at first', () => {
    // Check if cleanContent is being called
    expect(cleanAllDynamicContentMock).toHaveBeenCalledOnce()
  })

  it('Should create a paragraph element containg rover desription', () => {
    const roverInfo = document.querySelector(
      '#rover-info'
    ) as unknown as HTMLDivElement

    // Paragraph should be appended to roverInfo
    const firstChild = roverInfo.firstChild as HTMLElement

    // Expect that paragraph exists
    expect(firstChild).not.toBeNull()
    // Check if paragraph element was generated
    expect(firstChild.tagName).toBe('P')

    // Check if it contains the required information
    expect(firstChild.innerHTML).toContain(data.name)
    expect(firstChild.innerHTML).toContain(data.max_sol)
    expect(firstChild.innerHTML).toContain(data.total_photos)
    expect(firstChild.innerHTML).toContain(data.status)
  })

  it('Should display mission status in green or red depending on mission status', () => {
    // Check mission status and add value to a field
    const missionStatus = document.querySelector(
      '#mission-status'
    ) as unknown as HTMLElement

    // Stylings assigned to the element
    const greenColor = 'color:#7CFC00'
    const redColor = 'color:red'

    // In mocked data mission status is set to active
    expect(missionStatus.getAttribute('style')).toBe(greenColor)

    // Change mission status
    data.status = 'complete'
    // Call the function one more time
    displayRoverInfo(
      data,
      removeAllChildNodesMock,
    )

    // Expect the value to be red now
    expect(missionStatus.getAttribute('style')).toBe(redColor)
  })

  it('Should create an input field for solar day with specified min (0) and max values (maxSolDay)', () => {
    const solDayInputField = document.querySelector(
      '#selected-solar-day'
    ) as unknown as HTMLInputElement

    // Check if this element exist in the document
    expect(solDayInputField).not.toBeNull()

    // Check if min value was set to 0
    expect(solDayInputField.getAttribute('min')).toBe('0')

    // Expect its max value to be set to maxSol
    expect(solDayInputField.getAttribute('max')).toBe(data.max_sol)
  })

  it('Should create a failure msg div with an attibute hidden', () => {
    const failureDiv = document.querySelector(
      '.invalid-feedback'
    ) as unknown as HTMLDivElement

    // Expect failure div to be there
    expect(failureDiv).not.toBeNull()

    // Expect it to have hidden attribute
    expect(failureDiv.getAttribute('hidden')).toBe('')
  })
  it('Should keep failure div hidden', () => {
    const failureDiv = document.querySelector(
      '.invalid-feedback'
    ) as unknown as HTMLDivElement

    const solDayInputField = document.querySelector(
      '#selected-solar-day'
    ) as unknown as HTMLInputElement

    // Correct value for the input
    solDayInputField.value = '1'

    const changeEvent = new window.Event('change') as unknown as Event

    solDayInputField.dispatchEvent(changeEvent)

    // Expect failure div to be still hidden
    expect(failureDiv.getAttribute('hidden')).toBe('')
  })

  it('Should not have keep hidden attribute for failure div in case input was out of rage', () => {
    const failureDiv = document.querySelector(
      '.invalid-feedback'
    ) as unknown as HTMLDivElement

    const solDayInputField = document.querySelector(
      '#selected-solar-day'
    ) as unknown as HTMLInputElement

    // Provide incorrect value for the input
    solDayInputField.value = data.max_sol + 1

    const changeEvent = new window.Event('change') as unknown as Event

    solDayInputField.dispatchEvent(changeEvent)

    // Expect failure div to be still hidden
    expect(failureDiv.getAttribute('hidden')).toBeNull()
  })
