import type { responseManifest } from '../types/fetchedTypes'
import * as RoverDesc from './DisplayRoverInfo'

/**
 * Fetching mission manifest of a selected rover. Function requires to provide
 * roverName which is collected from the DOM, and calls displayRoverInfo function
 * to display result on the page
 * @param {string} roverName Name of a selected rover
 */
export function fetchManifest(roverName: string): void {
  fetch(
    `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}/?api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
  )
    .then(async (response) => await response.json())
    .then((data: responseManifest) => {
      RoverDesc.displayRoverInfo(data.photo_manifest, roverName)
    })
    .catch((error) => {
      console.log(error)
    })
}

// export async function fetchManifest(roverName: string): Promise<void> {
//   try {
//     const response = await fetch(
//       `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}/?api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
//     )
//     const result: responseManifest = await response.json()
//     RoverDesc.displayRoverInfo(result.photo_manifest, roverName)
//   } catch (error) {
//     console.log(error)
//   }
// }
