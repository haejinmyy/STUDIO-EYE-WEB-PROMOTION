export type IContent = {
  id: number;
  title: string;
};

export interface IRecruitmentList {
  content: IContent[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: [];
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: [];
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface IRecruitment {
  id: number;
  title: string;
  content: string;
}
