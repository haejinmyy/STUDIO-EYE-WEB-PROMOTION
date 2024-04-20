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
  state: number;
}

export interface IRequestData {
  data: IRequest[];
}

export interface IEditorData {
  key: string;
  text: string;
  type: string;
  depth: number;
}
