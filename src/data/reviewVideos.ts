export type ReviewVideo = {
  id: string;
  src: string; // Cloudinary MP4 URL
  caption: string;
};

// Update these Cloudinary links manually. You can paste full MP4 URLs
// like: https://res.cloudinary.com/<cloud_name>/video/upload/v<version>/<public_id>.mp4
export const videoReviews: ReviewVideo[] = [
  // {
  //   id: 'v1',
  //   src: 'https://res.cloudinary.com/dgm2mosta/video/upload/v1761642712/InShot_20251028_142209673_ckrzxc.mp4',
  //   caption: 'Real customer video review 1',
  // },
  // {
  //   id: 'v2',
  //   src: 'https://res.cloudinary.com/dgm2mosta/video/upload/v1761642958/InShot_20251028_142003655_rdzoy6.mp4',
  //   caption: 'Real customer video review 2',
  // },
  // {
  //   id: 'v3',
  //   src: 'https://res.cloudinary.com/dgm2mosta/video/upload/v1761642968/InShot_20251028_143220252_lcnsj4.mp4',
  //   caption: 'Real customer video review 3',
  // },
  // {
  //   id: 'v4',
  //   src: 'https://res.cloudinary.com/dgm2mosta/video/upload/v1761644532/InShot_20251028_142452675_gcjj3w.mp4',
  //   caption: 'Real customer video review 4',
  // },

];


