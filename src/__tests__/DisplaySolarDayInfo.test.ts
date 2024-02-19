import fs from 'fs'
import path from 'path'
import { Window } from 'happy-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import { displaySolDayInfo } from '../Utility/DisplaySolarDayInfo'
import { PhotoManifest } from '../types/fetchedTypes'

const htmlDocPath = path.join(process.cwd(), 'public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document
vi.stubGlobal('document', document)

// Mock of the data provided
let photoArr: PhotoManifest[] = [
  {
    earth_date: '1',
    sol: 1,
    total_photos: 1,
    cameras: ['cam1']
  }
]
const roverName = 'curiosity'
let selectedSolarDay = '1'

// Mock of the functions
const removeAllChildNodesMock = vi.fn()
const fetchBasicMock = vi.fn()
const fetchExpandedMock = vi.fn()
const displayCameraSelectorsMock = vi.fn()

beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
  displaySolDayInfo(
    photoArr,
    roverName,
    selectedSolarDay,
    removeAllChildNodesMock,
    fetchBasicMock,
    fetchExpandedMock,
    displayCameraSelectorsMock
  )
  vi.clearAllMocks()
})

it('Should generate a paragraph as a child of solar day description div', () => {
  const solDayDescDiv = document.querySelector(
    '#sol-day-desc'
  ) as unknown as HTMLDivElement
  //   Get the first child of the elemnt and cast a type
  const firstChild = solDayDescDiv.firstChild as HTMLElement
  // Check if this child element exists
  expect(firstChild).not.toBeNull()
  // Check if its of specific type
  expect(firstChild.tagName).toBe('P')
})

it('Should should contain selected solar day as a part of displayed content', () => {
  const solDayDescDiv = document.querySelector(
    '#sol-day-desc'
  ) as unknown as HTMLDivElement
  //   Get the first child of the elemnt and cast a type
  const firstChild = solDayDescDiv.firstChild as HTMLElement

  expect(firstChild.innerHTML).toContain(selectedSolarDay)
})

it('Should call displayCameraSelector() if total images amount is not equal 0, and call cleaningFuction once', () => {
  displaySolDayInfo(
    photoArr,
    roverName,
    selectedSolarDay,
    removeAllChildNodesMock,
    fetchBasicMock,
    fetchExpandedMock,
    displayCameraSelectorsMock
  )
  //   Cleaning function is called once if photo array is empty
  expect(removeAllChildNodesMock).toBeCalledTimes(1)

  // Display camera selectors should be also called in this case
  expect(displayCameraSelectorsMock).toBeCalledTimes(1)
})

it('Should should call cleaning function 4 times (all relevant divs + initial clean) when images are not present', () => {
  // Assign empty array to trigger other behaviour in the function
  photoArr = []

  displaySolDayInfo(
    photoArr,
    roverName,
    selectedSolarDay,
    removeAllChildNodesMock,
    fetchBasicMock,
    fetchExpandedMock,
    displayCameraSelectorsMock
  )

  expect(removeAllChildNodesMock).toBeCalledTimes(4)
})
