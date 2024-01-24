import * as Cleaner from "./Utility/ClearDynamicContent.js";
import * as RoverDesc from "./Utility/RoverInfo.js";
import { displayGallery } from "./Utility/DisplayGallery.js";
import { PaginationFixedPages } from "./Utility/PaginationFixedPages.js";
import { PaginationUncertainPAmount } from "./Utility/PaginationUncertainPCount.js";
import { responseManifest, responseRover } from "./types/fetchedTypes.js";

// ? ----------------------------------------------
// ? SELECT PARAMETERS AND FETCH MISSION MANIFEST
// ? ----------------------------------------------
function chooseRover() {
  const roverSelect = document.querySelector(
    "#rover-select"
  ) as HTMLSelectElement;
  roverSelect.addEventListener("change", () => {
    const roverName = roverSelect.value;
    console.log(roverName);
    if (roverName === "") {
      RoverDesc.displayEmptyRoverErr(
        "Nothing to display! Please select a rover!"
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

chooseRover();

// ? --------------------------------------------
// ? DEFINITION OF TWO DIFFERENT KINDS OF FETCH *
// ? --------------------------------------------
// * BASIC FETCH - Takes rover name and solar day
export function fetchBasic(
  roverName: string,
  selectedSolarDay: string,
  pagesCount: string,
  page = `1`
) {
  const fetchUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${selectedSolarDay}&page=${page}&api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`;
  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data: responseRover) => {
      showAllPhotos(data, roverName, selectedSolarDay, pagesCount, page);
    })
    .catch(() => console.log("Something went wrong"));
}

// * EXPANDED FETCH - Takes also selected camera
export function fetchExpanded(
  roverName: string,
  selectedSolarDay: string,
  camName: string,
  page = `1`
) {
  const fetchUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${selectedSolarDay}&camera=${camName}&page=${page}&api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`;
  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data: responseRover) => {
      showSelectedPhotos(data, roverName, selectedSolarDay, camName, page);
    })
    .catch(() => console.log("Something went wrong"));
}

// * Generate photos on a webpage
function showAllPhotos(
  data: responseRover,
  roverName: string,
  selectedSolarDay: string,
  pagesCount: string,
  page: string
) {
  // * Get the gallery div and clean it from existing content
  const photoDiv = document.querySelector("#photo-gallery") as HTMLDivElement;
  Cleaner.removeAllChildNodes(photoDiv);
  const pagesDiv = document.querySelector("#pages") as HTMLDivElement;
  Cleaner.removeAllChildNodes(pagesDiv);

  // *Create a div containing cards group
  const cardGroup = document.createElement("div");
  cardGroup.setAttribute("class", "row row-cols-1 row-cols-md-2 g-3");
  photoDiv.appendChild(cardGroup);

  // *Displaying photos is called from few places
  displayGallery(cardGroup, data);

  // *Display pagination for fixed and known amount of pages
  PaginationFixedPages(
    photoDiv,
    pagesDiv,
    pagesCount,
    roverName,
    selectedSolarDay,
    page
  );
}

function showSelectedPhotos(
  data: responseRover,
  roverName: string,
  selectedSolarDay: string,
  camName: string,
  page: string
) {
  // * Get the gallery div and clean it from existing content
  const photoDiv = document.querySelector("#photo-gallery") as HTMLDivElement;
  Cleaner.removeAllChildNodes(photoDiv);
  const pagesDiv = document.querySelector("#pages") as HTMLDivElement;
  Cleaner.removeAllChildNodes(pagesDiv);

  // *Create a div containing cards group
  const cardGroup = document.createElement("div");
  cardGroup.setAttribute("class", "row row-cols-1 row-cols-md-2 g-3");
  photoDiv.appendChild(cardGroup);

  // *Gallery is displayed from more places
  displayGallery(cardGroup, data);

  // * Display pagination for uncertain amount of pages
  PaginationUncertainPAmount(
    photoDiv,
    data,
    roverName,
    selectedSolarDay,
    camName,
    page
  );
}
