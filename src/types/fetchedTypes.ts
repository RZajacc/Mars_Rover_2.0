// * Interface from data fetched from mission manifest
export interface responseManifest {
  photo_manifest: missionManifest;
}

export interface missionManifest {
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: string;
  max_date: string;
  total_photos: number;
  photos: PhotoManifest[];
}

export interface PhotoManifest {
  sol: number;
  earth_date: string;
  total_photos: number;
  cameras: string[];
}

// * Fetched data

export interface Data {}

export interface Camera {
  full_name: string;
  id: number;
  name: string;
  rover_id: number;
}

// export interface APIResponse<Type> {
//   status: number;
//   data: Type;
//   error?: string;
// }
