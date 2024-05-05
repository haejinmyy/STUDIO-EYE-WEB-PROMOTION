import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const getCompanyLogo = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/company/logo`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error getCompanyLogo]', error);
    throw error;
  }
};

export const getCompanyBasic = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/company/basic`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error getCompanyBasic]', error);
    throw error;
  }
};
