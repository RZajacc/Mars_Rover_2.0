import type { responseRover } from './dataTypes'

// export interface fetchBasicType {
//   roverName: string
//   selectedSolarDay: string
//   pagesCount: string
//   showAllPhotos: (
//     data: responseRover,
//     roverName: string,
//     selectedSolarDay: string,
//     pagesCount: string,
//     page: string,
//     utils: utilFuncs
//   ) => void
// }

// export interface fetchExpandedType {
//   roverName: string
//   selectedSolarDay: string
//   camName: string
//   showSelectedCamPhotos: (
//     data: responseRover,
//     roverName: string,
//     selectedSolarDay: string,
//     camName: string,
//     page: string,
//     utils: utilFuncs
//   ) => void
// }

export interface utilFuncs {
  displayEmptyRoverErr: (
    message: string,
    cleanAllDynamicContent: () => void
  ) => void
  cleanAllDynamicContent: () => void
  removeAllChildNodes: (parent: HTMLElement) => void
  cleanAllAfterSolDayInput: () => void
  camSelectors: (
    camerasUsed: string[],
    removeAllChildNodes: (parent: HTMLElement) => void
  ) => string
  fetchImages: (
    roverName: string,
    selectedSolarDay: string,
    camName: string,
    page: string
  ) => Promise<responseRover>
  displayGallery: (
    data: responseRover,
    removeAllChildNodes: (parent: HTMLElement) => void
  ) => void
  paginationFixedPages: (
    pagesCount: string,
    roverName: string,
    selectedSolarDay: string,
    page: string,
    utils: utilFuncs
  ) => void
  paginationUncertainPCount: (
    data: responseRover,
    roverName: string,
    selectedSolarDay: string,
    camName: string,
    page: string,
    utils: utilFuncs
  ) => void
}
