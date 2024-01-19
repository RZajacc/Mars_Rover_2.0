// * Interface from data fetched from mission manifest
export interface roverManifest {
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: string;
  max_date: string;
  total_photos: number;
  photos: Photo[];
}

export interface Photo {
  sol: number;
  earth_date: string;
  total_photos: number;
  cameras: string[];
}

export interface responseManifest {
  photo_manifest: PhotoManifest;
}

export interface PhotoManifest {
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  photos: Photo[];
}

export interface APIResponse<Type> {
  status: number;
  data: Type;
  error?: string;
}
