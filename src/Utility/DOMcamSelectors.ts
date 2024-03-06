/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Displays camera select element with only those that were used by the rover
 * on the given day. Not all rover's have the same set of cameras, and not all
 * of them are used on any given day.
 * @param {string[]} cameraUsed Array of strings containg camera names used
 * by a rover at given day
 * @param {string} roverName Rover selected by the user
 * @param {string} selectedSolarDay Solar day selected by the user
 * @param {string} pagesCount It is a paginated api, and this number contains
 * calculated number of available pages to display.
 */
export function DOMcamSelectors(
  camerasUsed: string[],
  roverName: string,
  selectedSolarDay: string,
  pagesCount: string,
  removeAllChildNodes: (parent: HTMLElement) => void
): string {
  const camInfo: HTMLParagraphElement = document.querySelector('#cameras-info')!
  camInfo.innerHTML =
    'Each rover has a diffent set of cameras. Select the ones that are interesting for you:'

  const camerasList: HTMLDivElement =
    document.querySelector('#camera-selectors')!
  removeAllChildNodes(camerasList)

  // *List of available cameras
  const availableCameras = {
    ENTRY: 'Entry, Descent, and Landing Camera',
    FHAZ: 'Front Hazard Avoidance Camera',
    RHAZ: 'Rear Hazard Avoidance Camera',
    MAST: 'Mast Camera',
    CHEMCAM: 'Chemistry and Camera Complex',
    MAHLI: 'Mars Hand Lens Imager',
    MARDI: 'Mars Descent Imager',
    NAVCAM: 'Navigation Camera',
    PANCAM: 'Panoramic Camera',
    MINITES: 'Miniature Thermal Emission Spectrometer (Mini-TES)'
  }

  const camSelect = document.createElement('select')
  camSelect.setAttribute('class', 'form-select')
  camSelect.setAttribute('aria-label', 'camera-select')
  camSelect.setAttribute('id', 'cam-select')
  camerasList.appendChild(camSelect)

  const selectAll = document.createElement('option')
  selectAll.setAttribute('value', 'ALL')
  selectAll.textContent = 'All cameras'
  camSelect.appendChild(selectAll)

  // *Add cameras options to a list
  camerasUsed.forEach((camera) => {
    const selectOption = document.createElement('option')
    selectOption.setAttribute('value', camera)
    selectOption.textContent =
      availableCameras[camera as keyof typeof availableCameras]
    camSelect.appendChild(selectOption)
  })

  return camSelect.getAttribute('id')!
}
