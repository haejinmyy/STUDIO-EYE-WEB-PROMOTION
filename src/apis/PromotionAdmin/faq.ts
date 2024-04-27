import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';

export interface IFAQ {
  id: number;
  question: string;
  answer: string;
  visibility: boolean;
}

export interface IGetFAQData {
  data: IFAQ[];
}

export interface IGetFAQDetailData {
  data: IFAQ;
}

export function getFAQData() {
  return fetch(`${PROMOTION_BASIC_PATH}/api/faq`).then((response) => response.json());
}

export function getFAQDetailData(id: number) {
  return fetch(`${PROMOTION_BASIC_PATH}/api/faq/${id}`).then((response) => response.json());
}
