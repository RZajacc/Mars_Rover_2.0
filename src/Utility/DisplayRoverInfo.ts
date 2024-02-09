/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { displaySolDayInfo } from './DisplaySolarDayInfo'
import type {
  PhotoManifest,
  fetchBasicType,
  fetchExpandedType,
  missionManifest
} from '../types/fetchedTypes'

/**
 * Simple function displaying a message when rover was not
 * selected from select field in HTML. Before displaying content
 * it uses other util function to clean all previousle generated
 * content on the DOM tree.
 * @param {string} message Message to display on the page
 */
export function displayEmptyRoverErr(
  message: string,
  cleanAllDynamicContent: () => void
): void {
  // * Clear previously generated data
  cleanAllDynamicContent()

  // * Create a field to display provided message and append it
  const roverInfo: HTMLDivElement = document.querySelector('#rover-info')!
  const roverParagraph = document.createElement('p')
  roverParagraph.innerHTML = message
  roverParagraph.setAttribute('style', 'text-align:center; color:red')
  roverInfo.appendChild(roverParagraph)
}

/**
 * If the rover name was selected by a user on the page then data will be fetched
 * from NASA API. This entry doesn't contain images, but it holds a lot of information
 * about selected rovers mission. Part of if will be displayed on the page as a result
 * @param {missionManifest} info Data fetched from NASA API for selected rover
 * @param {string} roverName Name of the rover collected from select input on the page
 */
export function displayRoverInfo(
  info: missionManifest,
  roverName: string,
  cleanAllDynamicContent: () => void,
  removeAllChildNodes: (parent: HTMLElement) => void,
  fetchBasic: (args: fetchBasicType) => void,
  fetchExpanded: (args: fetchExpandedType) => void,
  displaySolDayInfo: (
    photoArr: PhotoManifest[],
    roverName: string,
    selectedSolarDay: string,
    removeAllChildNodes: (parent: HTMLElement) => void,
    fetchBasic: (args: fetchBasicType) => void,
    fetchExpanded: (args: fetchExpandedType) => void
  ) => void
): void {
  // * Clear previously generated data
  cleanAllDynamicContent()

  // * Create a field to display provided message and append it
  const roverInfo: HTMLDivElement = document.querySelector('#rover-info')!
  const roverParagraph = document.createElement('p')
  roverParagraph.innerHTML = `<strong>${info.name}</strong> was active for 
      <strong>${info.max_sol}</strong> solar days, and made 
      <strong>${info.total_photos}</strong> during that time. Current mission 
      status is <strong id="mission-status">${info.status}</strong>.`
  roverInfo.appendChild(roverParagraph)

  // * Check mission status and add value to a field
  const missionStatus: HTMLElement = document.querySelector('#mission-status')!

  missionStatus.textContent = info.status.toUpperCase()

  // * Apply color to mission status depending if its active or not
  if (info.status === 'active') {
    missionStatus.setAttribute('style', 'color:#7CFC00')
  } else {
    missionStatus.setAttribute('style', 'color:red')
  }

  // * Generate an input field for solar day
  const solDayInput: HTMLDivElement =
    document.querySelector('#solar-day-input')!

  // * Clear previously generated data
  removeAllChildNodes(solDayInput)

  const solDaylabel = document.createElement('span')
  solDaylabel.setAttribute('class', 'input-group-text')
  solDaylabel.setAttribute('id', 'inputGroup-sizing-sm')
  solDaylabel.textContent = 'Solar day to display'
  solDayInput.appendChild(solDaylabel)

  const solDayInputField = document.createElement('input')
  solDayInputField.setAttribute('type', 'number')
  solDayInputField.setAttribute('class', 'form-control')
  solDayInputField.setAttribute('min', '0')
  solDayInputField.setAttribute('max', info.max_sol)
  solDayInputField.setAttribute('aria-label', 'Sizing example input')
  solDayInputField.setAttribute('aria-describedby', 'inputGroup-sizing-sm')
  solDayInputField.setAttribute('id', 'selected-solar-day')
  solDayInputField.setAttribute('placeholder', 'i.e. 1')
  solDayInput.appendChild(solDayInputField)

  // * Invalid feedback div
  const failureDiv = document.createElement('div')
  failureDiv.setAttribute('class', 'invalid-feedback')
  failureDiv.setAttribute('hidden', '')
  failureDiv.innerHTML = `<strong>Value of range!</strong> You can choose between <strong>0</strong> and <strong>${info.max_sol}</strong>!`
  solDayInput.appendChild(failureDiv)

  // * Didplay error if provided value is out of range or call a function to display solar day information
  solDayInputField.addEventListener('change', () => {
    if (
      parseInt(solDayInputField.value) >= 0 &&
      parseInt(solDayInputField.value) <= parseInt(info.max_sol)
    ) {
      solDayInputField.setAttribute('class', 'form-control is-valid')
      failureDiv.setAttribute('hidden', '')
      displaySolDayInfo(
        info.photos,
        roverName,
        solDayInputField.value,
        removeAllChildNodes,
        fetchBasic,
        fetchExpanded
      )
    } else {
      solDayInputField.setAttribute('class', 'form-control is-invalid')
      failureDiv.toggleAttribute('hidden')
    }
  })
}
