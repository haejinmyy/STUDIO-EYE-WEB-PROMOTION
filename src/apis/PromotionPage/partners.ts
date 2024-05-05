import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const getPartners = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/partners`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error getPartners]', error);
    throw error;
  }
};
