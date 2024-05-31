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
  state: string;
  year: number;
  month: number;
}

export interface IRequestData {
  [x: string]: any;
  data: IRequest[];
}

export interface IEditorData {
  key: string;
  text: string;
  type: string;
  depth: number;
}
