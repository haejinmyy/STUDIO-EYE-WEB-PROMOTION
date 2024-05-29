export interface IFAQData {
  errors: {
    question: {
      message: string;
    };
    answer: {
      message: string;
    };
  };
  question: string;
  answer: string;
  visibility: boolean;
}

export interface IEditorData {
  key: string;
  text: string;
  type: string;
  depth: number;
}

// src/types.ts
export interface IContentItem {
  id: number;
  question: string;
  answer: string;
  visibility: boolean;
}

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IPaginationData {
  content: IContentItem[];
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
