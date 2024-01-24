import * as Cleaner from "./ClearDynamicContent.js";
import { displayCameraSelectors } from "./DisplayCameraSelectors.js";
import { PhotoManifest } from "../types/fetchedTypes.js";

export function displaySolDayInfo(
  photoArr: PhotoManifest[],
  roverName: string,
  selectedSolarDay: string
) {
  // * Find the array containing selected solar day
  const selectedData = photoArr.filter((entry) => {
    const selectedSolarDayInt = parseInt(selectedSolarDay);
    return entry.sol === selectedSolarDayInt;
  });

  const solDayDescDiv = document.querySelector(
    "#sol-day-desc"
  ) as HTMLDivElement;
  Cleaner.removeAllChildNodes(solDayDescDiv);

  const solDayDescParagraph = document.createElement("p");
  solDayDescDiv.appendChild(solDayDescParagraph);
  let totalPictures: number;
  let camerasUsed: string[] = [];

  // * If there's no match the list still will contain empty array
  if (selectedData.length !== 0) {
    totalPictures = selectedData[0].total_photos;
    camerasUsed = selectedData[0].cameras;
  } else {
    totalPictures = 0;
  }

  solDayDescParagraph.innerHTML = `On <strong>${selectedSolarDay}</strong> 
      solar day rover made a total of <strong>${totalPictures}</strong> pictures.`;

  // * If there are any pictures display them, if not, clear the rest of a screen
  if (totalPictures !== 0) {
    let pagesCount = Math.ceil(totalPictures / 25).toString();
    displayCameraSelectors(
      camerasUsed,
      roverName,
      selectedSolarDay,
      pagesCount
    );
  } else {
    const camerasList = document.querySelector(
      "#camera-selectors"
    ) as HTMLDivElement;
    Cleaner.removeAllChildNodes(camerasList);
    const camInfo = document.querySelector(
      "#cameras-info"
    ) as HTMLParagraphElement;
    camInfo.innerHTML = "";
    // * Get the gallery div and clean it from existing content
    const photoDiv = document.querySelector("#photo-gallery") as HTMLDivElement;
    Cleaner.removeAllChildNodes(photoDiv);
    const pagesDiv = document.querySelector("#pages") as HTMLDivElement;
    Cleaner.removeAllChildNodes(pagesDiv);
  }
}
