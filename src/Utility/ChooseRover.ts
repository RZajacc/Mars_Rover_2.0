import { responseManifest } from '../types/fetchedTypes.js';
import * as RoverDesc from './DisplayRoverInfo.js';
// ? ----------------------------------------------
// ? SELECT PARAMETERS AND FETCH MISSION MANIFEST
// ? ----------------------------------------------
export function chooseRover() {
   const roverSelect = document.querySelector(
      '#rover-select'
   ) as HTMLSelectElement;
   roverSelect.addEventListener('change', () => {
      const roverName = roverSelect.value;
      console.log(roverName);
      if (roverName === '') {
         RoverDesc.displayEmptyRoverErr(
            'Nothing to display! Please select a rover!'
         );
      } else {
         fetch(
            `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}/?api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
         )
            .then((response) => response.json())
            .then((data: responseManifest) => {
               RoverDesc.displayRoverInfo(data.photo_manifest, roverName);
            });
      }
   });
}
