import type { utilFuncs } from '../content'
import type {
  fetchBasicType,
  fetchExpandedType,
  responseRover
} from '../types/dataTypes'

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
  args: fetchBasicType,
  page = '1',
  utils: utilFuncs
): void {
  const fetchUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${args.roverName}/photos?sol=${args.selectedSolarDay}&page=${page}&api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
  fetch(fetchUrl)
    .then(async (response) => await response.json())
    .then((data: responseRover) => {
      args.showAllPhotos(
        data,
        args.roverName,
        args.selectedSolarDay,
        args.pagesCount,
        page,
        utils
      )
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
  args: fetchExpandedType,
  page = '1',
  utils: utilFuncs
): void {
  const fetchUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${args.roverName}/photos?sol=${args.selectedSolarDay}&camera=${args.camName}&page=${page}&api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
  fetch(fetchUrl)
    .then(async (response) => await response.json())
    .then((data: responseRover) => {
      args.showSelectedCamPhotos(
        data,
        args.roverName,
        args.selectedSolarDay,
        args.camName,
        page,
        utils
      )
    })
    .catch(() => {
      console.log('Something went wrong')
    })
}
