import axios from 'axios';
import { Request } from '@/types/request';

const BASE_URL = 'http://3.35.54.100:8080';

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

export interface IGetRequestData {
  data: IRequest[];
}

export interface IGetRequestDetailData {
  data: IRequest;
}

export const fetchRequests = async ({ requestId }: { requestId: number }): Promise<Request> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/requests/${requestId}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetching requests]', error);
    throw error;
  }
};

export function getRequestsData() {
  return fetch(`${BASE_URL}/api/requests`)
    .then((response) => response.json())
    .catch((error) => console.log('[❌Error fetching requests]', error));
}
