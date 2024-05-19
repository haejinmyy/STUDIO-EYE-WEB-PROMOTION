export type ArtworkImage = {
  id: number;
  imageUrlList: string;
  fileName: string;
};

export type ArtworkData = {
  id: number;
  department: string;
  category: string;
  name: string;
  client: string;
  date: string;
  link: string;
  overView: string;
  projectType: 'top' | 'main' | 'others';
  isPosted: boolean;
  mainImg: string;
  projectImages: ArtworkImage[];
  sequence: number;
};

export type UpdateArtwork = {
  request: {
    projectId: number;
    department: string;
    category: string;
    name: string;
    client: string;
    date: string;
    link: string;
    overView: string;
  };
  file: string;
  files: string[];
};

type filesType = {
  fileName: string;
  id: number;
  imageUrlList: string;
};
