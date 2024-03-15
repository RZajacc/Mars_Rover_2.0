import type { responseRover } from './dataTypes'

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
    camName: string,
    page: string,
    utils: utilFuncs
  ) => void
  paginationUncertainPCount: (
    imagesAmount: number,
    roverName: string,
    selectedSolarDay: string,
    camName: string,
    pagesCount: string,
    page: string,
    utils: utilFuncs
  ) => Promise<void>
}
