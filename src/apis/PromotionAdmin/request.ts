import axios from 'axios';
import { Request } from '@/types/request';

const BASE_URL = 'http://3.35.54.100:8080';

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
