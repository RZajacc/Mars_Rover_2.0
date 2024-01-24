import * as Cleaner from "./ClearDynamicContent.js";
import { fetchBasic, fetchExpanded } from "../content.js";

// * Display switches for cameras and initial fetch
export function displayCameraSelectors(
  camerasUsed: string[],
  roverName: string,
  selectedSolarDay: string,
  pagesCount: string
) {
  const camInfo = document.querySelector(
    "#cameras-info"
  ) as HTMLParagraphElement;
  camInfo.innerHTML =
    "Each rover has a diffent set of cameras. Select the ones that are interesting for you:";

  const camerasList = document.querySelector(
    "#camera-selectors"
  ) as HTMLDivElement;
  Cleaner.removeAllChildNodes(camerasList);

  // *List of available cameras
  const availableCameras = {
    ENTRY: "Entry, Descent, and Landing Camera",
    FHAZ: "Front Hazard Avoidance Camera",
    RHAZ: "Rear Hazard Avoidance Camera",
    MAST: "Mast Camera",
    CHEMCAM: "Chemistry and Camera Complex",
    MAHLI: "Mars Hand Lens Imager",
    MARDI: "Mars Descent Imager",
    NAVCAM: "Navigation Camera",
    PANCAM: "Panoramic Camera",
    MINITES: "Miniature Thermal Emission Spectrometer (Mini-TES)",
  };

  const camSelect = document.createElement("select");
  camSelect.setAttribute("class", "form-select");
  camSelect.setAttribute("aria-label", "camera-select");
  camSelect.setAttribute("id", "cam-select");
  camerasList.appendChild(camSelect);

  const selectAll = document.createElement("option");
  selectAll.setAttribute("value", "ALL");
  selectAll.textContent = "All cameras";
  camSelect.appendChild(selectAll);

  // *Add cameras options to a list
  camerasUsed.forEach((camera) => {
    const selectOption = document.createElement("option");
    selectOption.setAttribute("value", camera);
    selectOption.textContent =
      availableCameras[camera as keyof typeof availableCameras];
    camSelect.appendChild(selectOption);
  });

  // * Make a first fetch and then respond to select change
  fetchBasic(roverName, selectedSolarDay, pagesCount);

  camSelect.addEventListener("change", () => {
    if (camSelect.value === "ALL") {
      fetchBasic(roverName, selectedSolarDay, pagesCount);
    } else {
      fetchExpanded(roverName, selectedSolarDay, camSelect.value);
    }
  });
}
