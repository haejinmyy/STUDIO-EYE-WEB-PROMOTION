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
  address: string;
  fax: string;
  id: number;
  introduction: string;
  logoImageUrl: string;
  phone: string;
  sloganImageUrl: string;
  detailInformation: {
    WHATWEDO1: string;
    WHATWEDO2: string;
    WHATWEDO3: string;
    WHATWEDO4: string;
    WHATWEDO5: string;
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
