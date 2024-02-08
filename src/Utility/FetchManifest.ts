import type {
  fetchBasicType,
  fetchExpandedType,
  missionManifest,
  responseManifest
} from '../types/fetchedTypes'
import {
  cleanAllDynamicContent,
  removeAllChildNodes
} from '../Utility/ClearDynamicContent'
/**
 * Fetching mission manifest of a selected rover. Function requires to provide
 * roverName which is collected from the DOM, and calls displayRoverInfo function
 * to display result on the page
 * @param {string} roverName Name of a selected rover
 */
export function fetchManifest(
  roverName: string,
  displayRoverInfo: (
    info: missionManifest,
    roverName: string,
    cleanAllDynamicContent: () => void,
    removeAllChildNodes: (parent: HTMLElement) => void,
    fetchBasic: (args: fetchBasicType) => void,
    fetchExpanded: (args: fetchExpandedType) => void
  ) => void,
  fetchBasic: (args: fetchBasicType) => void,
  fetchExpanded: (args: fetchExpandedType) => void
): void {
  fetch(
    `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}/?api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
  )
    .then(async (response) => await response.json())
    .then((data: responseManifest) => {
      displayRoverInfo(
        data.photo_manifest,
        roverName,
        cleanAllDynamicContent,
        removeAllChildNodes,
        fetchBasic,
        fetchExpanded
      )
    })
    .catch((error) => {
      console.log(error)
    })
}
