import * as Cleaner from "./Utility/ClearDynamicContent.js";
import * as RoverDesc from "./Utility/RoverInfo.js";
import { displayGallery } from "./Utility/DisplayGallery.js";
import { PaginationFixedPages } from "./Utility/PaginationFixedPages.js";
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

  // * If requested page is empty then move to last working one (Pagination)
  if (data.photos.length === 0) {
    const targetPage = +page - 1;
    Cleaner.removeAllChildNodes(photoDiv);
    fetchExpanded(roverName, selectedSolarDay, camName, targetPage.toString());
  }

  // * PAGINATION LOGIC
  if (data.photos.length === 25 || +page != 1) {
    // ? Create navigation and Previous element tab
    const pagesDiv = document.querySelector("#pages") as HTMLDivElement;
    const paginationNav = document.createElement("nav");
    paginationNav.setAttribute("aria-label", "pagination-nav");
    pagesDiv.appendChild(paginationNav);
    const paginationUl = document.createElement("ul");
    paginationUl.setAttribute("class", "pagination justify-content-center");
    paginationNav.appendChild(paginationUl);

    // *Create a move to a FIRST PAGE element
    const firstLi = document.createElement("li");
    firstLi.setAttribute("class", "page-item");
    const firstHref = document.createElement("a");
    firstHref.setAttribute("class", "page-link");
    firstHref.setAttribute("href", "#");
    firstHref.textContent = "First Page";
    firstLi.appendChild(firstHref);
    paginationUl.appendChild(firstLi);

    firstHref.addEventListener("click", () => {
      const targetPage = `1`;
      Cleaner.removeAllChildNodes(photoDiv);
      fetchExpanded(roverName, selectedSolarDay, camName, targetPage);
    });

    // *Create a move to a PREVIOUS PAGE element
    const previousLi = document.createElement("li");
    previousLi.setAttribute("class", "page-item");
    const previousHref = document.createElement("a");
    previousHref.setAttribute("class", "page-link");
    previousHref.setAttribute("href", "#");
    previousHref.textContent = "Previous";
    previousLi.appendChild(previousHref);
    paginationUl.appendChild(previousLi);

    previousHref.addEventListener("click", () => {
      if (+page > 1) {
        let targetPage = +page - 1;
        Cleaner.removeAllChildNodes(photoDiv);
        fetchExpanded(
          roverName,
          selectedSolarDay,
          camName,
          targetPage.toString()
        );
      }
    });

    // * Create a CURRENT PAGE element
    const currentLi = document.createElement("li");
    currentLi.setAttribute("class", "page-item");
    const currentHref = document.createElement("a");
    currentHref.setAttribute("class", "page-link disabled");
    currentHref.setAttribute("href", "");
    currentHref.textContent = page;
    currentLi.appendChild(currentHref);
    paginationUl.appendChild(currentLi);

    // *Create a move to NEXT element
    const nextLi = document.createElement("li");
    nextLi.setAttribute("class", "page-item");
    const nextHref = document.createElement("a");
    nextHref.setAttribute("class", "page-link");
    nextHref.setAttribute("href", "#");
    nextHref.textContent = "Next Page";
    nextLi.appendChild(nextHref);
    paginationUl.appendChild(nextLi);

    nextHref.addEventListener("click", () => {
      const targetPage = +page + 1;
      Cleaner.removeAllChildNodes(photoDiv);
      fetchExpanded(
        roverName,
        selectedSolarDay,
        camName,
        targetPage.toString()
      );
    });
  }
}
