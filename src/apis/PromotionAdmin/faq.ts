import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

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

export const getFAQData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/faq`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getFAQPaginateData = async (page: number, perPage: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/faq/page?page=${page}&size=${perPage}`);
    return response.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getFAQDetailData = async (id: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/faq/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching artwork detail]', error);
    throw error;
  }
};
