export interface IClientData {
  clientInfo: {
    name: string;
    visibility: boolean;
    id: number;
  };
  logoImg: string;
}

export interface ICEOData {
  id: number;
  name: string;
  introduction: string;
  imageFileName: string;
  imageUrl: string;
}

export interface ICompanyData {
  mainOverview: string;
  commitment: string;
  address: string;
  addressEnglish: string;
  fax: string;
  id: number;
  introduction: string;
  logoImageFileName: string;
  logoImageUrl: string;
  phone: string;
  sloganImageFileName: string;
  sloganImageUrl: string;
  detailInformation: { key: string; value: string }[];
}
export interface IPartnersData {
  logoImg: string;
  partnerInfo: {
    id: number;
    is_main: boolean;
    link: string;
    name: string;
  };
}

interface IClientContentItem {
  id: number;
  name: string;
  logoImg: string;
  visibility: boolean;
}

interface IPartnerContentItem {
  id: number;
  name: string;
  logoImageUrl: string;
  is_main: boolean;
  link: string;
}

interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IClientPaginationData {
  content: IClientContentItem[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface IPartnerPaginationData {
  content: IPartnerContentItem[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
