import { loginType } from '@/types/PromotionAdmin/login';
import axios from 'axios';

const BASE_URL = 'http://43.201.95.252:8000';

export const login = async (email: string, pwd: string): Promise<loginType> => {
  try {
    const response = await axios.post('/user-service/login', { email, pwd });
    return response.data;
  } catch (error) {
    console.log('[❌Error login api]', error);
    throw error;
  }
};
