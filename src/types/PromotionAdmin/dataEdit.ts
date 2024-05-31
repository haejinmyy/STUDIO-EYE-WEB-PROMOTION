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
