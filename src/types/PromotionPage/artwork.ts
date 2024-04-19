interface IArtwork {
  id: number;
  department: string;
  category: string;
  name: string;
  link: string;
  client: string;
  date: string;
  mainImg: string;
  overView: string;
  isPosted: boolean;
  projectImages: IProjectImages[];
}

export interface IProjectImages {
  fileName: string;
  id: number;
  imageUrlList: string;
}

export interface IArtworksData {
  data: IArtwork[];
}

export interface IArtworkData {
  data: IArtwork;
}
