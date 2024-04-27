import { loginType } from '@/types/PromotionAdmin/login';
import axios from 'axios';

export const login = async (email: string, pwd: string): Promise<loginType> => {
  try {
    const response = await axios.post('http://43.201.98.4:8000/user-service/login', { email, pwd });
    return response.data;
  } catch (error) {
    console.log('[❌Error login api]', error);
    throw error;
  }
};
