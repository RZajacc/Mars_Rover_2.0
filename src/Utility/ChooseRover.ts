import { responseManifest } from '../types/fetchedTypes.js';
import * as RoverDesc from './DisplayRoverInfo.js';

/**
 * It queries select field on the page containing a string with a name
 * of a rover to display data for. In case none was selected it will trigger
 * a function do display error with a message provided manually. If it is selected
 * properly it will fetch data from NASA API's mission manifest containing information
 * describing selected rover's mission and pass it to a function that will display it
 * on the page
 */
export function chooseRover() {
   const roverSelect = document.querySelector(
      '#rover-select'
   ) as HTMLSelectElement;

   // * Listen to changes in select field and store seleted value in a variable
   roverSelect.addEventListener('change', () => {
      const roverName = roverSelect.value;

      // * In case nothing was selected display an error
      if (roverName === '') {
         RoverDesc.displayEmptyRoverErr(
            'Nothing to display! Please select a rover!'
         );
         // * If rover was selected fetch data from its mission manifest entry
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
