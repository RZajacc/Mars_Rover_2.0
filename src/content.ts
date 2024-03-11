/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { displayGallery } from './Utility/displayGallery'
import { PaginationFixedPages } from './Utility/PaginationFixedPages'
import { PaginationUncertainPAmount } from './Utility/PaginationUncertainPCount'
import type {
  PhotoManifest,
  fetchBasicType,
  fetchExpandedType,
  missionManifest,
  responseManifest,
  responseRover
} from './types/fetchedTypes.js'
import { displayEmptyRoverErr } from './Utility/DisplayEmptyRoverErr'
import {
  cleanAllDynamicContent,
  removeAllChildNodes,
  cleanAllAfterSolDayInput
} from './Utility/DOMCleaners'
import { fetchBasic, fetchExpanded } from './Utility/FetchData'
import { DOMdisplayRoverInfo } from './Utility/DOMDisplayRover'
import { DOMSolDayInfo } from './Utility/DOMSolDayInfo'
import { DOMcamSelectors } from './Utility/DOMcamSelectors'
// ? ----------------------------------------------------------------------
// ? SELECTING ROVER - Serves as a root call for everytning that comes next
// ? ----------------------------------------------------------------------
/**
 * It queries select field on the page containing a string with a name
 * of a rover to display data for. In case none was selected it will trigger
 * a function do display error with a message provided manually. If it is selected
 * properly it will fetch data from NASA API's mission manifest containing information
 * describing selected rover's mission and pass it to a function that will display it
 * on the page
 */
export interface utilFuncs {
  displayEmptyRoverErr: (
    message: string,
    cleanAllDynamicContent: () => void
  ) => void
  cleanAllDynamicContent: () => void
  removeAllChildNodes: (parent: HTMLElement) => void
  cleanAllAfterSolDayInput: () => void
  fetchBasic: (args: fetchBasicType, page: string, utils: utilFuncs) => void
  fetchExpanded: (
    args: fetchExpandedType,
    page: string,
    utils: utilFuncs
  ) => void
  displayGallery: (data: responseRover, cleanAllDynamicContent: () => void) => void
}

export const chooseRover = (utils: utilFuncs): void => {
  //* Query select field from document
  const roverSelect: HTMLSelectElement =
    document.querySelector('#rover-select')!
  // * Add an event listenet to it and get selected value
  roverSelect.addEventListener('change', (e) => {
    const target = e.target as HTMLSelectElement
    const roverName = target.value

    // * In case nothing was selected display an error
    if (roverName === '') {
      utils.displayEmptyRoverErr(
        'Nothing to display! Please select a rover!',
        utils.cleanAllDynamicContent
      )
      // * If rover was selected fetch data from its mission manifest entry
    } else {
      // * Fetch mission manifest
      const manifestUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}/?api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
      fetch(manifestUrl)
        .then(async (response) => await response.json())
        .then((data: responseManifest) => {
          displayRoverInfoSection(data.photo_manifest, roverName, utils)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
}
// * INIT the function
chooseRover({
  displayEmptyRoverErr,
  cleanAllDynamicContent,
  removeAllChildNodes,
  cleanAllAfterSolDayInput,
  fetchBasic,
  fetchExpanded,
  displayGallery
})

export const displayRoverInfoSection = (
  info: missionManifest,
  roverName: string,
  utils: utilFuncs
): void => {
  // * Clear previously generated data
  utils.cleanAllDynamicContent()

  // * Build DOM elements with a function and retrieve ID's of elements required to continue
  const [solDayInputID, failureDivID] = DOMdisplayRoverInfo(
    info,
    utils.removeAllChildNodes
  )

  // * To continue furhter its necessary to select fields that were generated by this function
  const solDayInputField = document.getElementById(
    solDayInputID
  ) as HTMLInputElement
  const failureDiv = document.getElementById(failureDivID) as HTMLDivElement
  // * Display error if provided value is out of range or call a function to display solar day information
  solDayInputField.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    const solDay = target.value
    if (parseInt(solDay) >= 0 && parseInt(solDay) <= parseInt(info.max_sol)) {
      solDayInputField.setAttribute('class', 'form-control is-valid')
      failureDiv.setAttribute('hidden', '')
      displaySolDayInfoSection(
        info.photos,
        roverName,
        solDayInputField.value,
        utils
      )
    } else {
      solDayInputField.setAttribute('class', 'form-control is-invalid')
      failureDiv.toggleAttribute('hidden')
    }
  })
}

export const displaySolDayInfoSection = (
  photoArr: PhotoManifest[],
  roverName: string,
  selectedSolarDay: string,
  utils: utilFuncs
): void => {
  // * Call helper function to display data only for selected day
  const [totalPictures, camerasUsed] = DOMSolDayInfo(
    photoArr,
    selectedSolarDay,
    utils.removeAllChildNodes
  )
  // * If there are any pictures display them, if not, clear the rest of a screen
  if (totalPictures !== 0) {
    const pagesCount = Math.ceil(totalPictures / 25).toString()
    displayCameraSelectorsSection(
      camerasUsed,
      roverName,
      selectedSolarDay,
      pagesCount,
      utils
    )
  } else {
    utils.cleanAllAfterSolDayInput()
  }
}

export const displayCameraSelectorsSection = (
  camerasUsed: string[],
  roverName: string,
  selectedSolarDay: string,
  pagesCount: string,
  utils: utilFuncs
): void => {
  const camSelectID = DOMcamSelectors(
    camerasUsed,
    roverName,
    selectedSolarDay,
    pagesCount,
    utils.removeAllChildNodes
  )

  const camSelect = document.getElementById(camSelectID) as HTMLSelectElement

  // * Make a first fetch and then respond to select change
  const args1: fetchBasicType = {
    roverName,
    selectedSolarDay,
    pagesCount,
    showAllPhotos
  }

  utils.fetchBasic(args1, '1', utils)

  // * Basic and expanded fetch differ only selected camera passed as attribute
  camSelect.addEventListener('change', () => {
    if (camSelect.value === 'ALL') {
      utils.fetchBasic(args1, '1', utils)
      console.log('Fetching basic')
    } else {
      const args2: fetchExpandedType = {
        roverName,
        selectedSolarDay,
        camName: camSelect.value,
        showSelectedPhotos
      }
      utils.fetchExpanded(args2, '1', utils)
    }
  })
}

/**
 * Called only by basic fetch function. It receives the data required
 * to display gallery, and prepares the area for it. To display the images
 * it calls displayGallery function. Then it calles also pagination in a version
 * fitting to this kind of fetch.
 * @param {responseRover} data Data fetched from the API
 * @param {string} roverName Rover selected by the user
 * @param {string} selectedSolarDay Solar day selected by the user
 * @param {string} pagesCount Calculated amount of pages available to display
 * @param {string} page Page user is currently on (default=1).
 */
export function showAllPhotos(
  data: responseRover,
  roverName: string,
  selectedSolarDay: string,
  pagesCount: string,
  page: string,
  utils: utilFuncs
): void {
  // *Displaying photos is called from few places
  utils.displayGallery(data, cleanAllDynamicContent)

  // *Display pagination for fixed and known amount of pages
  PaginationFixedPages(pagesCount, roverName, selectedSolarDay, page, utils)
}

/**
 * Called only by expanded fetch function. It receives the data required
 * to display gallery, and prepares the area for it. To display the images
 * it calls displayGallery function. Then it calles also pagination in a version
 * fitting to this kind of fetch.
 * @param {responseRover} data Data fetched from the API
 * @param {string} roverName Rover selected by the user
 * @param {string} selectedSolarDay Solar day selected by the user
 * @param {string} camName Name of the camera selected
 * @param {string} page Page user is currently on (default=1).
 */
export function showSelectedPhotos(
  data: responseRover,
  roverName: string,
  selectedSolarDay: string,
  camName: string,
  page: string,
  utils: utilFuncs
): void {
  // *Gallery is displayed from more places
  utils.displayGallery(data, cleanAllDynamicContent)

  // * Display pagination for uncertain amount of pages
  PaginationUncertainPAmount(
    data,
    roverName,
    selectedSolarDay,
    camName,
    page,
    utils
  )
}
