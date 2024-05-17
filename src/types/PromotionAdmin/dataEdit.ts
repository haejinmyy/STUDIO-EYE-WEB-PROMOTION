export interface IClientData {
  clientInfo: {
    name: string;
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
  fax: string;
  id: number;
  introduction: string;
  logoImageFileName: string;
  logoImageUrl: string;
  phone: string;
  sloganImageFileName: string;
  sloganImageUrl: string;
  detailInformation: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
}
export interface IPartnersData {
  logoImg: string;
  partnerInfo: {
    id: number;
    is_main: boolean;
    link: string;
  };
}
