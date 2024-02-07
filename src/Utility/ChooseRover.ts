/**
 * It queries select field on the page containing a string with a name
 * of a rover to display data for. In case none was selected it will trigger
 * a function do display error with a message provided manually. If it is selected
 * properly it will fetch data from NASA API's mission manifest containing information
 * describing selected rover's mission and pass it to a function that will display it
 * on the page
 */
export function chooseRover(
  roverSelect: HTMLSelectElement,
  displayEmptyRoverErr: (message: string) => void,
  fetchManifest: (roverName: string) => void
): void {
  // * Listen to changes in select field and store selected value in a variable
  roverSelect.addEventListener('change', () => {
    const roverName = roverSelect.value

    // * In case nothing was selected display an error
    if (roverName === '') {
      displayEmptyRoverErr('Nothing to display! Please select a rover!')
      // * If rover was selected fetch data from its mission manifest entry
    } else {
      // * Call the function fetching mission manifest
      fetchManifest(roverName)
    }
  })
}
