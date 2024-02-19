/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type {
  PhotoManifest,
  fetchBasicType,
  fetchExpandedType
} from '../types/fetchedTypes'

/**
 * Displays basic information referring to a solar day selected by the user,
 * like how many pictures were taken on that day in total. If there were
 * some pictures taken then also data referring to cameras used by the rover
 * will be collected and provided to a function displaying camera selectors.
 * @param {PhotoManifest[]} photoArr Photos fetched from NASA API for a given
 * solar day.
 * @param {string} roverName Rover selected by the user
 * @param {string} selectedSolarDay Solar day selected by the user
 */
export function displaySolDayInfo(
  photoArr: PhotoManifest[],
  roverName: string,
  selectedSolarDay: string,
  removeAllChildNodes: (parent: HTMLElement) => void,
  fetchBasic: (args: fetchBasicType) => void,
  fetchExpanded: (args: fetchExpandedType) => void,
  displayCameraSelectors: (
    camerasUsed: string[],
    roverName: string,
    selectedSolarDay: string,
    pagesCount: string,
    removeAllChildNodes: (parent: HTMLElement) => void,
    fetchBasic: (args: fetchBasicType) => void,
    fetchExpanded: (args: fetchExpandedType) => void
  ) => void
): void {
  // * Find the array containing selected solar day
  const selectedData = photoArr.filter((entry) => {
    const selectedSolarDayInt = parseInt(selectedSolarDay)
    return entry.sol === selectedSolarDayInt
  })

  const solDayDescDiv: HTMLDivElement = document.querySelector('#sol-day-desc')!
  removeAllChildNodes(solDayDescDiv)

  const solDayDescParagraph = document.createElement('p')
  solDayDescDiv.appendChild(solDayDescParagraph)
  let totalPictures: number
  let camerasUsed: string[] = []

  // * If there's no match the list still will contain empty array
  if (selectedData.length !== 0) {
    totalPictures = selectedData[0].total_photos
    camerasUsed = selectedData[0].cameras
  } else {
    totalPictures = 0
  }

  // * Display message on the page
  solDayDescParagraph.innerHTML = `On <strong>${selectedSolarDay}</strong> 
      solar day rover made a total of <strong>${totalPictures}</strong> pictures.`

  // * If there are any pictures display them, if not, clear the rest of a screen
  if (totalPictures !== 0) {
    const pagesCount = Math.ceil(totalPictures / 25).toString()
    displayCameraSelectors(
      camerasUsed,
      roverName,
      selectedSolarDay,
      pagesCount,
      removeAllChildNodes,
      fetchBasic,
      fetchExpanded
    )
  } else {
    const camerasList: HTMLDivElement =
      document.querySelector('#camera-selectors')!
    removeAllChildNodes(camerasList)
    const camInfo: HTMLParagraphElement =
      document.querySelector('#cameras-info')!
    camInfo.innerHTML = ''
    // * Get the gallery div and clean it from existing content
    const photoDiv: HTMLDivElement = document.querySelector('#photo-gallery')!
    removeAllChildNodes(photoDiv)
    const pagesDiv: HTMLDivElement = document.querySelector('#pages')!
    removeAllChildNodes(pagesDiv)
  }
}
