export interface IRequest {
  id: number;
  category: string;
  contact: string;
  description: string;
  email: string;
  organization: string;
  position: string;
  fileUrlList: Array<string>;
  clientName: string;
}

export interface IRequestData {
  data: IRequest[];
}
