// ? ----------------------------------------------
// ? -----------CLEANER FUNCTIONS -----------------
// ? ----------------------------------------------
// * REMOVE ALL CHILDREN OF SELECTED ELEMENT
export function removeAllChildNodes(parent: HTMLDivElement): void {
   while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
   }
}

// *REMOVES ALL DYNAMICALLY CREATED CONTENT
export function cleanAllDynamicContent() {
   const roverInfo = document.querySelector('#rover-info') as HTMLDivElement;
   removeAllChildNodes(roverInfo);
   const solDayDescDiv = document.querySelector(
      '#sol-day-desc'
   ) as HTMLDivElement;
   removeAllChildNodes(solDayDescDiv);
   const camerasList = document.querySelector(
      '#camera-selectors'
   ) as HTMLDivElement;
   removeAllChildNodes(camerasList);
   const camInfo = document.querySelector(
      '#cameras-info'
   ) as HTMLParagraphElement;
   camInfo.innerHTML = '';
   const solDayInput = document.querySelector(
      '#solar-day-input'
   ) as HTMLDivElement;
   removeAllChildNodes(solDayInput);

   // * Get the gallery div and clean it from existing content
   const photoDiv = document.querySelector('#photo-gallery') as HTMLDivElement;
   removeAllChildNodes(photoDiv);

   // *Get pagination div and delete the content
   const pagesDiv = document.querySelector('#pages') as HTMLDivElement;
   removeAllChildNodes(pagesDiv);
}
