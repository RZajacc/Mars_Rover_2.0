import * as Cleaner from './ClearDynamicContent.js';
import { displaySolDayInfo } from './DisplaySolarDayInfo.js';
import { missionManifest } from '../types/fetchedTypes.js';

// ? ----------------------------------------------
// ? -----DISPLAY ALL RELEVANT INFORMATIONS--------
// ? ----------------------------------------------
// * If no rover selected clean all the data below
export function displayEmptyRoverErr(message: string) {
   Cleaner.cleanAllDynamicContent();

   const roverInfo = document.querySelector('#rover-info') as HTMLDivElement;
   // * Generate description of selected rover
   const roverParagraph = document.createElement('p');
   roverParagraph.innerHTML = `<strong>${message}</strong>`;
   roverParagraph.setAttribute('style', 'text-align:center; color:red');
   roverInfo.appendChild(roverParagraph);
}

// *If data is provided display information about selected rover
export function displayRoverInfo(info: missionManifest, roverName: string) {
   Cleaner.cleanAllDynamicContent();

   const roverInfo = document.querySelector('#rover-info') as HTMLDivElement;
   // * Generate description of selected rover
   const roverParagraph = document.createElement('p');
   roverParagraph.innerHTML = `<strong>${info.name}</strong> was active for 
      <strong>${info.max_sol}</strong> solar days, and made 
      <strong>${info.total_photos}</strong> during that time. Current mission 
      status is <strong id="mission-status">${info.status.toUpperCase()}</strong>.`;
   roverInfo.appendChild(roverParagraph);

   // * Check mission status and change it's color accordingly
   const missionStatus = document.querySelector(
      '#mission-status'
   ) as HTMLElement;

   if (info.status === 'active') {
      missionStatus.textContent = info.status.toUpperCase();
      missionStatus.setAttribute('style', 'color:#7CFC00');
   } else {
      missionStatus.textContent = info.status.toUpperCase();
      missionStatus.setAttribute('style', 'color:red');
   }

   // * Generate a input field for solar day
   const solDayInput = document.querySelector(
      '#solar-day-input'
   ) as HTMLDivElement;
   Cleaner.removeAllChildNodes(solDayInput);
   const solDaylabel = document.createElement('span');
   solDaylabel.setAttribute('class', 'input-group-text');
   solDaylabel.setAttribute('id', 'inputGroup-sizing-sm');
   solDaylabel.textContent = 'Solar day to display';
   solDayInput.appendChild(solDaylabel);

   const solDayInputField = document.createElement('input');
   solDayInputField.setAttribute('type', 'number');
   solDayInputField.setAttribute('class', 'form-control');
   solDayInputField.setAttribute('min', '0');
   solDayInputField.setAttribute('max', info.max_sol);
   solDayInputField.setAttribute('aria-label', 'Sizing example input');
   solDayInputField.setAttribute('aria-describedby', 'inputGroup-sizing-sm');
   solDayInputField.setAttribute('id', 'selected-solar-day');
   solDayInputField.setAttribute('placeholder', 'i.e. 1');
   solDayInput.appendChild(solDayInputField);

   // * Invalid feedback div
   const failureDiv = document.createElement('div');
   failureDiv.setAttribute('class', 'invalid-feedback');
   failureDiv.setAttribute('hidden', '');
   failureDiv.innerHTML = `<strong>Value of range!</strong> You can choose between <strong>0</strong> and <strong>${info.max_sol}</strong>!`;
   solDayInput.appendChild(failureDiv);

   // * Add value of a solar day
   solDayInputField.addEventListener('change', () => {
      if (
         parseInt(solDayInputField.value) >= 0 &&
         parseInt(solDayInputField.value) <= parseInt(info.max_sol)
      ) {
         solDayInputField.setAttribute('class', 'form-control is-valid');
         failureDiv.setAttribute('hidden', '');
         displaySolDayInfo(info.photos, roverName, solDayInputField.value);
      } else {
         solDayInputField.setAttribute('class', 'form-control is-invalid');
         failureDiv.toggleAttribute('hidden');
      }
   });
}
