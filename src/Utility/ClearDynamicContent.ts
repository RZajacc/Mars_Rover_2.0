/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/**
 * Helper function deleting all child nodes of a provided HTML Element.
 * @param {HTMLElement} parent Element for which you want to delete all child nodes
 */
export function removeAllChildNodes(parent: HTMLElement): void {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

/**
 * it queries of elements of the page that might contain dynamically generated content
 * and removes it with the help of removeAllChildNodes function.
 */
export function cleanAllDynamicContent(): void {
  const roverInfo: HTMLDivElement = document.querySelector('#rover-info')!
  removeAllChildNodes(roverInfo)
  const solDayDescDiv: HTMLDivElement = document.querySelector('#sol-day-desc')!
  removeAllChildNodes(solDayDescDiv)
  const camerasList: HTMLDivElement =
    document.querySelector('#camera-selectors')!
  removeAllChildNodes(camerasList)
  const camInfo: HTMLParagraphElement = document.querySelector('#cameras-info')!
  camInfo.innerHTML = ''
  const solDayInput: HTMLDivElement =
    document.querySelector('#solar-day-input')!
  removeAllChildNodes(solDayInput)

  // * Get the gallery div and clean it from existing content
  const photoDiv: HTMLDivElement = document.querySelector('#photo-gallery')!
  removeAllChildNodes(photoDiv)

  // *Get pagination div and delete the content
  const pagesDiv: HTMLDivElement = document.querySelector('#pages')!
  removeAllChildNodes(pagesDiv)
}
