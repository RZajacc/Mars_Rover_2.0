/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Cleaner from './Utility/ClearDynamicContent'
import { chooseRover } from './Utility/ChooseRover'
import { displayGallery } from './Utility/DisplayGallery'
import { PaginationFixedPages } from './Utility/PaginationFixedPages'
import { PaginationUncertainPAmount } from './Utility/PaginationUncertainPCount'
import type { responseRover } from './types/fetchedTypes.js'

// ? ----------------------------------------------------------------------
// ? SELECTING ROVER - Serves as a root call for everytning that comes next
// ? ----------------------------------------------------------------------
chooseRover()

// ? ----------------------------------------------------------------------
// ? FETCHING DATA - Functions are called in several places but since they
// ? they are connected with displaying images I decided to keep them here
// ? for better readability.
// ? ----------------------------------------------------------------------
/**
 * Requests a data from NASA Api for a selected rover, on a selected solar day. API
 * is paginated (each response contains 25 entries), therefore also page attribute is
 * specified. By default it will always fetch first page, untill its provided otherwise
 * by clicking a page number on pagination at the bottom of the page. In this case
 * data is fetched for all cameras that were used by a rover on this day. After successfull
 * fetch data is passed to a function that will display all selected photos on the page.
 * @param {string} roverName Rover selected by the user
 * @param {string} selectedSolarDay Solar day selected by the user
 * @param {string} pagesCount Calculated amount of page that are available to display
 * @param {string} page Page user is currently on (default=1).
 */
export function fetchBasic(
  roverName: string,
  selectedSolarDay: string,
  pagesCount: string,
  page = '1'
): void {
  const fetchUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${selectedSolarDay}&page=${page}&api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
  fetch(fetchUrl)
    .then(async (response) => await response.json())
    .then((data: responseRover) => {
      showAllPhotos(data, roverName, selectedSolarDay, pagesCount, page)
    })
    .catch(() => {
      console.log('Something went wrong')
    })
}

/**
 * Requests a data from NASA Api for a selected rover, on a selected solar day. API
 * is paginated (each response contains 25 entries), therefore also page attribute is
 * specified. By default it will always fetch first page, untill its provided otherwise
 * by clicking a page number on pagination at the bottom of the page. In this case
 * data is fetched only for the camera selected by the user. After successfull
 * fetch data is passed to a function that will display only those selected images.
 * @param {string} roverName Rover selected by the user
 * @param {string} selectedSolarDay Solar day selected by the user
 * @param {string} camName Name of the camera selected
 * @param {string} page Page user is currently on (default=1).
 */
export function fetchExpanded(
  roverName: string,
  selectedSolarDay: string,
  camName: string,
  page = '1'
): void {
  const fetchUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${selectedSolarDay}&camera=${camName}&page=${page}&api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
  fetch(fetchUrl)
    .then(async (response) => await response.json())
    .then((data: responseRover) => {
      showSelectedPhotos(data, roverName, selectedSolarDay, camName, page)
    })
    .catch(() => {
      console.log('Something went wrong')
    })
}

// ? -----------------------------------------------------------------------
// ? DISPLAYING IMAGES - Functions are called only by fetching corresponding
// ? fetching methods. Logic in both methods is similar but it differs a bit
// ? in pagination and therefore it was easier to divide them in two.
// ? -----------------------------------------------------------------------
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
function showAllPhotos(
  data: responseRover,
  roverName: string,
  selectedSolarDay: string,
  pagesCount: string,
  page: string
): void {
  // * Get the gallery div and clean it from existing content
  const photoDiv: HTMLDivElement = document.querySelector('#photo-gallery')!
  Cleaner.removeAllChildNodes(photoDiv)
  const pagesDiv: HTMLDivElement = document.querySelector('#pages')!
  Cleaner.removeAllChildNodes(pagesDiv)

  // *Create a div containing cards group
  const cardGroup = document.createElement('div')
  cardGroup.setAttribute('class', 'row row-cols-1 row-cols-md-2 g-3')
  photoDiv.appendChild(cardGroup)

  // *Displaying photos is called from few places
  displayGallery(cardGroup, data)

  // *Display pagination for fixed and known amount of pages
  PaginationFixedPages(
    photoDiv,
    pagesDiv,
    pagesCount,
    roverName,
    selectedSolarDay,
    page
  )
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
function showSelectedPhotos(
  data: responseRover,
  roverName: string,
  selectedSolarDay: string,
  camName: string,
  page: string
): void {
  // * Get the gallery div and clean it from existing content
  const photoDiv: HTMLDivElement = document.querySelector('#photo-gallery')!
  Cleaner.removeAllChildNodes(photoDiv)
  const pagesDiv: HTMLDivElement = document.querySelector('#pages')!
  Cleaner.removeAllChildNodes(pagesDiv)

  // *Create a div containing cards group
  const cardGroup = document.createElement('div')
  cardGroup.setAttribute('class', 'row row-cols-1 row-cols-md-2 g-3')
  photoDiv.appendChild(cardGroup)

  // *Gallery is displayed from more places
  displayGallery(cardGroup, data)

  // * Display pagination for uncertain amount of pages
  PaginationUncertainPAmount(
    photoDiv,
    data,
    roverName,
    selectedSolarDay,
    camName,
    page
  )
}
