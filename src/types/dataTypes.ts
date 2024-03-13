import type { utilFuncs } from '../content'

// * Interface from data fetched from mission manifest
export interface responseManifest {
  photo_manifest: missionManifest
}

export interface missionManifest {
  name: string
  landing_date: string
  launch_date: string
  status: string
  max_sol: string
  max_date: string
  total_photos: number
  photos: PhotoManifest[]
}

export interface PhotoManifest {
  sol: number
  earth_date: string
  total_photos: number
  cameras: string[]
}

// * Fetched data
export interface responseRover {
  photos: Photo[]
}

export interface Photo {
  camera: Camera
  earth_date: string
  id: number
  img_src: string
  rover: Rover
  sol: number
}

export interface Camera {
  full_name: string
  id: number
  name: string
  rover_id: number
}

export interface Rover {
  cameras: RoverCam[]
  id: number
  landing_date: string
  launch_date: string
  max_date: string
  max_sol: number
  name: string
  status: string
  total_photos: number
}

export interface RoverCam {
  full_name: string
  name: string
}

export interface fetchBasicType {
  roverName: string
  selectedSolarDay: string
  pagesCount: string
  showAllPhotos: (
    data: responseRover,
    roverName: string,
    selectedSolarDay: string,
    pagesCount: string,
    page: string,
    utils: utilFuncs
  ) => void
}

export interface fetchExpandedType {
  roverName: string
  selectedSolarDay: string
  camName: string
  showSelectedCamPhotos: (
    data: responseRover,
    roverName: string,
    selectedSolarDay: string,
    camName: string,
    page: string,
    utils: utilFuncs
  ) => void
}
