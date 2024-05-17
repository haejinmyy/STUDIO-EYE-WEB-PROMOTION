import axios from 'axios';
import { Request } from '@/types/request';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';

export const fetchRequests = async ({ requestId }: { requestId: number }): Promise<Request> => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/requests/${requestId}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetching requests]', error);
    throw error;
  }
};

export const getRequestsData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/requests`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};
